import { MdOutlineNotificationsNone } from 'react-icons/md'
import { AiOutlineSetting, AiOutlineHome } from 'react-icons/ai'
import { BsGraphDown } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'




export const NavBarBottom = () => {

    const navigate = useNavigate()


  return (
    <div className="btm-nav sticky bottom-0 items-center">
        <button className="active" onClick={() => navigate('/dashboard')}>
            <AiOutlineHome className='text-2xl'/>
            <p className='text-sm'>Inicio</p>
        </button>

        <button >
            <BsGraphDown className='text-2xl'/>
            <p className='text-sm'>Mis finanzas</p>
        </button>

        <button>
            <MdOutlineNotificationsNone className='text-2xl'/>
            <p className='text-sm'>Notificaciones</p>
        </button>

        <button onClick={() => navigate('/ajustes')}>
            <AiOutlineSetting className='text-2xl'/>
            <p className='text-sm'>Ajustes</p>
        </button>

    </div>
  )
}
