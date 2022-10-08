import React from 'react'
import useAuth from "../api/useAuth";



export default function HomeHero () {
    const { token, onLogout } = useAuth();
    const handleLogout = e => {
      e.preventDefault();
      onLogout();
    }
  

    return (

        <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Let us keep track of your</span>{' '}
                <span className="block text-darkblue-600 xl:inline">distillery operations,</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                so that you can focus on what you do best: making one-of-a-kind products.
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            {!!token ? 
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                        <label onClick={handleLogout} className="modal-button flex w-full items-center justify-center rounded-md border border-transparent bg-darkblue-100 px-8 py-3 text-base font-medium text-darkblue-700 hover:bg-darkblue-200 md:py-4 md:px-10 md:text-lg no-underline">Logout</label>
                    </div>
                :
                <>
                    <div className="rounded-md shadow">
                        <label
                            htmlFor="registerModal"
                            className="modal-button flex w-full items-center justify-center rounded-md border border-transparent bg-darkblue-500 px-8 py-3 text-base font-medium text-white hover:bg-darkblue-700 md:py-4 md:px-10 md:text-lg no-underline cursor-pointer"
                        >
                            Get started
                        </label>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                        <label htmlFor="loginModal" className="modal-button flex w-full items-center justify-center rounded-md border border-transparent bg-darkblue-100 px-8 py-3 text-base font-medium text-darkblue-700 hover:bg-darkblue-200 md:py-4 md:px-10 md:text-lg no-underline">Log in</label>
                    </div>
                </>}
            </div>
            </div>
        </main>
    )
}