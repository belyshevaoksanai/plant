import Image from 'next/image'
import plantImage from '@/public/hand-holding-plant.png'
import { SignIn } from '@/components/sign-in';

export default function LoginPage() {
  return (
    <main>
      <div className='absolute flex gap-2 p-3'>
        <Image
          width={16}
          height={16}
          src="/logo.svg"
          alt="logo"
        />
        <span className='text-white'>Plant</span>
      </div>
      <div className="bg-blue grid grid-cols-[2fr_1fr] h-screen">
        <div className='flex flex-col items-center justify-center gap-3'>
          <span className='text-white font-bold text-7xl'>Полей цветочки,</span>
          <span className='text-green font-bold text-7xl'>детка!</span>
          <SignIn />
        </div>
        <div className='flex items-end'>
          <Image
            alt="hand holding plant"
            src={plantImage}
          />
        </div>
      </div>
    </main>
  );
}
