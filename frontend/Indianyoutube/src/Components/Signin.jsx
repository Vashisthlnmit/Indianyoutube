import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../Redux/authentication";
import { Link, useNavigate } from "react-router-dom";
import toast,{Toaster} from "react-hot-toast"
export default function Signin() {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const [data, setdata] = useState({ email: "", password: "" });
    async function pleasesignin(e) {
        e.preventDefault();
        const signindata = ({ email: data.email, password: data.password });
        const pullingrequest = await dispatch(signin(signindata));
        navigate("/");
    }
    return (
        <section className="bg-black">
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                    <h2 className="text-center text-2xl font-bold leading-tight text-white">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-white ">
                        Don&apos;t have an account?{' '}
                        <Link
                            to="/Signup"
                            className="font-semibold text-white transition-all duration-200 hover:underline"
                        >
                            Create a free account
                        </Link>
                    </p>
                    <form onSubmit={pleasesignin} className="mt-8">
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="" className="text-base font-medium text-white">
                                    {' '}
                                    Email address{' '}
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border text-white border-white-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="email"
                                        placeholder="Email"
                                        value={data.email}
                                        onChange={(e) => (setdata({ ...data, email: e.target.value }))}
                                    ></input>
                                </div>
                            </div>
                            <div>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full text-white rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="password"
                                        placeholder="Password"
                                        value={data.password}
                                        onChange={(e) => (setdata({ ...data, password: e.target.value }))}
                                    ></input>
                                </div>
                            </div>
                            <div>
                                <button
                                    className="inline-flex w-full items-center justify-center rounded-md bg-white px-3.5 py-2.5 font-semibold leading-7 text-black hover:bg-white/80"
                                >
                                    Get started
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <Toaster/>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ WebkitTransition: "0.3s", transition: "0.3s" }}
                version="1.1"
                viewBox="0 0 1440 490"
            >
                <defs>
                    <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
                        <stop
                            offset="0%"
                            stopColor="rgba(202.956, 44.405, 221.168, 1)"
                        ></stop>
                        <stop
                            offset="100%"
                            stopColor="rgba(239.383, 7.518, 224.001, 1)"
                        ></stop>
                    </linearGradient>
                </defs>
                <path
                    fill="url(#sw-gradient-0)"
                    d="M0 98l10 57.2C20 212 40 327 60 318.5s40-138.5 60-147S160 278 180 343s40 82 60 73.5 40-40.5 60-106.2c20-65.3 40-163.3 60-147 20 16.7 40 146.7 60 196 20 48.7 40 16.7 60-49 20-65.3 40-163.3 60-204.1 20-41.2 40-24.2 60 8.1 20 32.7 40 81.7 60 138.9 20 56.8 40 122.8 60 155.1 20 32.7 40 32.7 60 16.4 20-16.7 40-48.7 60-122.5 20-73.2 40-188.2 60-171.5 20 16.3 40 163.3 60 228.6 20 65.7 40 48.7 60 32.7s40-33 60-57.2c20-24.8 40-56.8 60-65.3s40 8.5 60-32.7c20-40.8 40-138.8 60-114.3 20 24.5 40 171.5 60 187.8 20 16.7 40-98.3 60-163.3 20-65 40-82 50-89.8l10-8.2v441H0z"
                ></path>
                <defs>
                    <linearGradient id="sw-gradient-1" x1="0" x2="0" y1="1" y2="0">
                        <stop offset="0%" stopColor="rgba(13.981, 7.017, 4.78, 1)"></stop>
                        <stop offset="100%" stopColor="rgba(81.003, 10.887, 255, 1)"></stop>
                    </linearGradient>
                </defs>
                <path
                    fill="url(#sw-gradient-1)"
                    d="M0 441l10-73.5C20 294 40 147 60 147s40 147 60 212.3c20 65.7 40 48.7 60 32.7s40-33 60-32.7c20-.3 40 16.7 60-8.1 20-24.2 40-90.2 60-138.9 20-49.3 40-81.3 60-49C440 196 460 294 480 294s40-98 60-138.8c20-41.2 40-24.2 60 0 20 24.8 40 56.8 60 49 20-8.2 40-57.2 60-49 20 7.8 40 73.8 60 73.5 20 .3 40-65.7 60-89.9 20-24.8 40-7.8 60 24.5 20 32.7 40 81.7 60 73.5 20-7.8 40-73.8 60-122.5 20-49.3 40-81.3 60-65.3s40 82 60 155.2c20 73.8 40 154.8 60 147 20-8.2 40-106.2 60-179.7 20-73.5 40-122.5 60-106.2 20 16.7 40 97.7 60 155.2 20 57.5 40 89.5 50 106.2l10 16.3v147H0z"
                    opacity="0.9"
                    transform="translate(0 50)"
                ></path>
            </svg>
        </section>
         
    )
}