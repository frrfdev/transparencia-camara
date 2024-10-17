import Image from 'next/image';
import { redirect } from 'next/navigation';

export default function Home() {
  return redirect('/patch-notes');

  return (
    <div className="h-full w-full">
      <div className="flex gap-2 w-[600px] h-[200px] relative">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/b/b5/C%C3%A2mara_dos_Deputados.png"
          alt="Câmara dos Deputados"
          fill
        />
      </div>
    </div>
  );
}
