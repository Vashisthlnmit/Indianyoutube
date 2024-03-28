import React from "react";
export default function Aboutus() {
    return (
        <>
            <div className="bg-black min-h-screen">
                {/* Header */}
                <header className="bg-black shadow-lg">
                    <div className="container mx-auto px-6 py-3">
                        <h1 className="text-xl font-semibold text-white">About Us</h1>
                    </div>
                </header>

                {/* Main Content */}
                <div className="container mx-auto px-6 py-8">
                    <div className="lg:flex justify-center">
                        {/* Left Column */}
                        <div className="lg:w-1/2 lg:mr-10">
                            <h2 className="text-3xl font-semibold text-white mb-4">Our Story</h2>
                            <p className="text-white leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet, nunc vel
                                eleifend vestibulum, est dui vulputate est, sed dignissim justo magna et sapien.
                                Donec vitae mauris non purus fermentum aliquet vel sit amet ante. Donec vestibulum
                                sapien eget magna fringilla.
                            </p>
                            <p className="text-white leading-relaxed mt-4">
                                Nulla facilisi. Nam vehicula, nunc eget eleifend feugiat, eros purus ullamcorper
                                ante, ut blandit lacus dolor et libero. Nulla consequat mauris at libero euismod,
                                eget molestie metus varius. Sed id tempus sapien, sit amet volutpat lectus.
                            </p>
                        </div>

                        {/* Right Column */}
                        <div className="lg:w-1/2 mt-10 lg:mt-0">
                            <img
                                src="https://media.istockphoto.com/id/1145887344/photo/online-live-video-marketing-concept.webp?b=1&s=170667a&w=0&k=20&c=awy0YB52aRxLbOJGA_Wbcg2miaXM3TKJeN3_rRTyJio="
                                alt="Company"
                                className="h-auto w-full object-cover object-center"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}