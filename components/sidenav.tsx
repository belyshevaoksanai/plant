import { signOut } from '@/auth';
import Link from 'next/link';
import Image from 'next/image'
import NavLinks from '@/components/nav-links';

export default function SideNav() {
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-beige">
            <Link
                className="mb-2 flex h-20 items-end justify-center rounded-md bg-blue-600 p-4 md:h-40"
                href="/"
            >
                <div className='absolute flex gap-2 p-3'>
                    <Image
                        width={32}
                        height={32}
                        src="/logo.svg"
                        alt="logo"
                    />
                    <span className='text-white font-bold text-2xl'>Полей меня!</span>
                </div>
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 items-center">
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
                <form action={async () => {
                    'use server';
                    await signOut();
                }}>
                    <button type="submit" className="bg-green hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <div>Выйти</div>
                    </button>
                </form>
            </div>
        </div>
    );
}
