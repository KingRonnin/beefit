import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <>
        <nav className="bg-gunmetal py-4 px-6 flex items-center justify-between mb-5">
            <div className="flex items-center">
                <Link to={'/'}>
                    <div className="text-lg uppercase font-bold text-white">
                        Beefit
                    </div>
                </Link>
            </div>
            <div className="text-white">
                <Link to='sign-in' className='text-gray-300 hover:text-white mr-3'>
                Sign In
                </Link>
                <Link to='sign-up' className='text-gray-300 hover:text-white mr-3'>
                Sign Up
                </Link>
            </div>
        </nav>
        </>
    )
}