import { useAuth, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

export default function Header() {
    const { userId } = useAuth();
    console.log(userId);

    return (
        <>
        <nav className="bg-gunmetal py-4 px-6 flex items-center justify-between mb-5">
            <div className="flex items-center">
                <Link to={'/'}>
                    <div className="text-lg uppercase font-bold text-white">
                        BEEFIT
                    </div>
                </Link>
            </div>
            <div className="text-white flex items-center">
                {!userId && (
                    <>
                        <Link to='sign-in' className='text-gray-300 hover:text-white'>
                            Sign In
                        </Link>
                        <Link to='sign-up' className='text-gray-300 hover:text-white'>
                            Sign Up
                        </Link>
                    </>
                )}{userId && (
                    <>
                        <Link to={'/dashboard'} className='text-gray-300 hover:text-white mr-10'>
                            Dashboard
                        </Link>
                        <Link to={'/myplan'} className='text-gray-300 hover:text-white mr-10'>
                            My Plan
                        </Link>
                        <Link to={'/weeklyreminder'} className='text-gray-300 hover:text-white mr-10'>
                            Weekly Reminder
                        </Link>
                    </>
                )}
                <div className="ml-auto">
                    <UserButton afterSignOutUrl='/'/>
                </div>
            </div>
        </nav>
        </>
    )
}