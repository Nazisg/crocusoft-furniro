import React from 'react'
import { Link } from "react-router-dom";
import arrow from '../assets/icons/arrow.svg'
import logo from '../assets/icons/logo.svg'

export default function PageHeader({page_name, title}) {
  return (
    <section className="page-bg bg-cover w-full h-[220px] md:h-[260px] lg:h-[288px] flex justify-center items-center">
        <div className="flex flex-col justify-center items-center mt-10">
          <img className='w-[35px] md:w-[40px] mb-1 lg:w-[45px]' src={logo} />
          <h2 className="lg:text-[48px] md:text-[40px] text-[35px] font-medium">{title}</h2>
          <div className="flex items-center justify-center gap-1 lg:pt-3">
            <Link className="font-medium text-[14px] lg:text-[16px]" to="/">
              Home
            </Link>
            <img className='w-[15px] lg:w-[20px]'src={arrow} />
            <p className="font-light text-[14px] lg:text-[16px]">{page_name}</p>
          </div>
        </div>
      </section>
  )
}
 