import { dbContext } from "config/database.config";
import Wallet from "models/wallet.model";
import Boom from "@hapi/boom";
import Decimal from "decimal.js";
import { TransactionService } from "./transaction.service";
import { DepositService } from "./deposit.service";
export class WalletService {
  private static readonly walletRepository = dbContext.getRepository(Wallet);

  public static async create(): Promise<Wallet> {


    const cardNumber = `${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(
      1000 + Math.random() * 9000
    )}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const cvv = Math.floor(100 + Math.random() * 900).toString();

    const expirationDate = `${Math.floor(1 + Math.random() * 12)}/${Math.floor(
      2021 + Math.random() * 5
    )}`;

    const wallet = await this.walletRepository.create({
      cardNumber,
      cvv,
      expirationDate,
    });

    await this.walletRepository.save(wallet);
    return wallet;
  }
  public static async getWalletById(id: string): Promise<Wallet> {
    const wallet = await this.walletRepository.findOneBy({ id });
    if (!wallet) throw Boom.notFound("Wallet not found");
    return wallet;
  }
  public static async depositPesos(
    amount: number,
    senderId: string,
    receiverId?: string
  ): Promise<void> {
    if (receiverId) {
      const walletSender = await this.walletRepository.findOneBy({
        id: senderId,
      });
      const walletReceiver = await this.walletRepository.findOneBy({
        id: receiverId,
      });
      if (!walletSender || !walletReceiver)
        throw Boom.notFound("Wallet not found");

      const balanceSender = new Decimal(walletSender.balancePesos);
      const balanceReceiver = new Decimal(walletReceiver.balancePesos);
      const amountDecimal = new Decimal(amount);

      const newBalanceReceiver = balanceReceiver.plus(amountDecimal);

      const newBalanceSender = balanceSender.minus(amountDecimal);

      await TransactionService.createTransaction({
        senderId,
        receiverId,
        amount: amountDecimal.toNumber(),
      });

      const queryRunner = dbContext.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        await queryRunner.manager.update(
          Wallet,
          { id: walletReceiver.id },
          { balancePesos: newBalanceReceiver.toString() }
        );
        await queryRunner.manager.update(
          Wallet,
          { id: walletSender.id },
          { balancePesos: newBalanceSender.toString() }
        );

        await queryRunner.commitTransaction();
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw Boom.internal("Failed to deposit, please try again");
      } finally {
        await queryRunner.release();
      }
    } else {
      const wallet = await this.walletRepository.findOneBy({
        id: senderId,
      });
      if (!wallet) throw Boom.notFound("Wallet not found");
      const balance = new Decimal(wallet.balancePesos);
      const amountDecimal = new Decimal(amount);
      const newBalance = balance.plus(amountDecimal);

      await DepositService.createDeposit({
        walletId: senderId,
        amount: amountDecimal.toNumber(),
      });

      const queryRunner = dbContext.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        await queryRunner.manager.update(
          Wallet,
          { id: wallet.id },
          { balancePesos: newBalance.toString() }
        );
        await queryRunner.commitTransaction();
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw Boom.internal("Failed to deposit, please try again");
      } finally {
        await queryRunner.release();
      }
    }
  }

  public static async findOne(id: string): Promise<Wallet> {
    const wallet = await this.walletRepository.findOneBy({ id });

    if (!wallet) throw Boom.notFound(`Wallet with id ${id} not found`);

    return wallet;
  }
}
