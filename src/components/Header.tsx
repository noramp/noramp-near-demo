import Link from 'next/link';

export default function Header() {
  return (
    <div className="bg-white">
      <div className="container flex items-center justify-between mx-auto 2xl:container 2xl:mx-auto">
        <div className="flex flex-row justify-between">
          <Link href="/">
            <div className="flex items-center py-6 pl-4 pr-8 space-x-3 lg:pl-7 sm:pl-6">
              <h1 className="text-2xl font-normal leading-6 text-gray-800">
                NoRamp Near Demo
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
