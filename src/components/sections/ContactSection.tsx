import { FaWhatsapp, FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import ContactForm from "../forms/ContactForm";

export default function ContactSection() {

    return (
        <section className=" py-12 container px-6 mx-auto">
            <div className=" mt-8 flex gap-8 flex-col md:flex-row *:w-full">
                <div className="">
                    {/* contact form */}
                    <ContactForm />
                </div>
                <div className="">
                    <h3 className=" text-xl mb-4">Contact Info</h3>
                    <div className=" flex flex-col gap-4 items-start">
                        <a href="mailto:abdulazeezsalami@gmail.com" target="_blank" rel="noopener noreferrer" className=" flex gap-2 items-center hover:text-primary">
                            <span className=" w-5 aspect-square flex justify-start items-center"><IoMail /></span>
                            <span className=" text-sm font-semibold">abdulazeezsalami19@gmail.com</span>
                        </a>
                        <a href="tel:+2348106925925" target="_blank" rel="noopener noreferrer" className=" flex gap-2 items-center hover:text-primary">
                            <span className=" w-5 aspect-square flex justify-start items-center"><FaPhone /></span>
                            <span className=" text-sm font-semibold">+234 810 692 5925</span>
                        </a>
                    </div>
                    <div className=" mt-8 flex gap-4 items-center text-lg">
                        <a href="https://wa.me/+2348106925925" target="_blank" rel="noopener noreferrer" className=" hover:text-primary">
                            <FaWhatsapp />
                        </a>
                        <a href="https://www.linkedin.com/in/abdulazeezsalami19/" target="_blank" rel="noopener noreferrer" className=" hover:text-primary">
                            <FaLinkedinIn />
                        </a>
                        <a href="https://web.facebook.com/profile.php?id=100084453611899" target="_blank" rel="noopener noreferrer" className=" hover:text-primary">
                            <FaFacebookF />
                        </a>
                        <a href="https://www.instagram.com/_az_ziz/" target="_blank" rel="noopener noreferrer" className=" hover:text-primary">
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}