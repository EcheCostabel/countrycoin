import { NavBar } from './NavBar'
import { AiOutlineEye, AiFillCreditCard, AiOutlinePlus } from "react-icons/ai";
import { BiTransfer } from "react-icons/bi";
import { LiaPiggyBankSolid } from "react-icons/lia";
import { BsPhone } from "react-icons/bs";
import { NavBarBottom } from './NavBarBottom/NavBarBottom';
import { Link } from 'react-router-dom';



export const Dashboard = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <NavBar />

      <div className='flex w-full bg-gray-200'>
        <div className='p-8 w-2/4'>
          <h1 className='text-xl'>Saldo actual</h1>
          <AiOutlineEye className='text-4xl' />
          <h1 className='text-3xl font-bold'>$28.48</h1>
        </div>
        <div className='w-20'></div>
        <div className='px-4 w-2/4 flex flex-col justify-center items-end'>
          <Link to={"/ingresarDinero"}>
          <button className="btn btn-sm w-full px-2 mb-2">Ingresar dinero</button>     
          </Link>
          {/* <button className="btn btn-sm w-full px-2">Extraer dinero</button> */}
        </div>
      </div>

      <div className='h-60 bg-gray-200 m-6'>
        Mis Tarjetas
      </div>

      <div className='flex flex-col justify-center items-center min-h-full'>
        <div className='w-screen'>

          <div className='flex items-center justify-around px-3 pt-3'>

            <div className='flex flex-col items-center w-1/4'>
              <Link to='/servicioPagar'>
              <div className='bg-gray-300 rounded-full h-14 w-14 flex items-center justify-center'>
                <AiFillCreditCard className='text-3xl' />
              </div>
              <h5>Pagos</h5>
            </Link>
            </div>

              <div className='flex flex-col items-center w-1/4' >
                <Link to='/transferencias' className='flex flex-col items-center'>
                <div className='bg-gray-300 rounded-full h-14 w-14 flex items-center justify-center'>
                  <BiTransfer className='text-3xl' />
                </div>
                <h5>Transferencias</h5>
                </Link>
              </div>
    

            <div className='flex flex-col items-center w-1/4'>
              <div className='bg-gray-300 rounded-full h-14 w-14 flex items-center justify-center'>
                <BsPhone className='text-3xl' />
              </div>
              <h5>Recargas</h5>
            </div>
          </div>
        </div>
        <div className='w-screen mb-10'>
          <div className='flex items-center justify-around mx-3 mt-8'>
            <div className='flex flex-col items-center w-1/4 px-10'>
              <div className='bg-gray-300 rounded-full h-14 w-14 flex items-center justify-center'>
                <LiaPiggyBankSolid className='text-3xl' />
              </div>
              <h5>Inversiones</h5>
            </div>

            <div className='flex flex-col items-center w-1/4'>
              <div className='bg-gray-300 rounded-full h-14 w-14 flex items-center justify-center'>
                <AiOutlinePlus className='text-3xl' />
              </div>
              <h5>Movimientos</h5>
            </div>

          </div>
        </div>
      </div>
      <div className='flex-grow'></div>


      <NavBarBottom />
    </div>
  )
}
