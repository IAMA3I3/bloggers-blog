export const Footer = () => {
    return (
        <footer className=" mt-4 w-full py-4 bg-slate-700 text-white">
            <div className=" container m-auto px-6 flex justify-end">
                <p className=''>© <a href="https://abdulazeezsalami.vercel.app/" target="_blank" rel="noopener noreferrer" className=' hover:underline'>Aziz</a> {new Date().getFullYear()}</p>
            </div>
        </footer>
    )
}