"use client";

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import Image from 'next/image';
import React from 'react';

interface WealthItem {
  alt: string;
  src: string;
  description: string;
}

export default function WealthForestPage() {
  const [selectedItem, setSelectedItem] = useState<WealthItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const items: WealthItem[] = [
    { alt: "Operating Businesses", src: "/images/operating-business.png", description: "This refers to companies that are actively managed and run by individuals or families. These businesses generate revenue and profits through their operations. They can be in any industry and vary in size from small family-owned businesses to large corporations. Operating businesses represent a significant portion of an owner's wealth and are often considered for succession planning and estate planning." },
    { alt: "Financial Assets", src: "/images/financial-assets.png", description: "These are liquid assets that can be quickly converted into cash without losing value. Financial assets include stocks, bonds, mutual funds, cash and cash equivalents, bank deposits, and any other instrument that can be traded in financial markets. They are an essential part of an individual's investment portfolio and are critical for diversification and risk management." },
    { alt: "Real Estate", src: "/images/real-estate.png", description: "This category includes residential, commercial, and industrial properties owned by an individual or family. Real estate can generate income through renting or leasing and appreciate in value over time, making it a vital component of wealth building. Real estate investments can also be leveraged for estate planning and passing wealth to future generations." },
    { alt: "Deferred Assets", src: "/images/deferred-assets.png", description: "These are assets or income that are set to be received in the future. Deferred assets can include pensions, retirement accounts (like 401(k)s, IRAs, RRSPs), and other long-term investment vehicles. They are crucial for retirement planning and ensuring financial security in later years." },
    { alt: "Human Capital", src: "/images/human-capital.png", description: "This refers to the economic value of an individual's experience, skills, knowledge, and abilities. Investing in human capital can include education, training, and health care. Human capital is considered an asset as it can increase earning potential over a lifetime and affect the economic output of businesses and economies." },
    { alt: "Family Heirlooms", src: "/images/family-heirlooms.png", description: "These are valuable items passed down through generations within a family. Heirlooms can include jewelry, art, antiques, and other collectibles with both sentimental and monetary value. They can be significant in estate planning due to their emotional value and potential appreciation over time." },
    { alt: "Philanthropy", src: "/images/philanthropy.png", description: "This involves the act of giving back to society through charitable donations, setting up foundations, or engaging in volunteer work. Philanthropy can be a way for individuals and families to support causes they care about, leave a legacy, and impact society positively. It also plays a role in estate planning and can be structured through various vehicles like trusts and donor-advised funds to ensure long-term philanthropic goals are met." },
  ];

  function openModal(item: WealthItem) {
    setSelectedItem(item);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedItem(null);
  }

  
  return (
      <div className="bg-[#1e3a3a] text-white p-8">
        <h1 className="text-5xl font-bold mb-8">Building Your Wealth Forest</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <div key={index} className="group relative cursor-pointer" onClick={() => openModal(item)}>
              <div className="w-full h-auto relative" style={{ aspectRatio: '1 / 1' }}>
                <Image src={item.src} alt={item.alt} layout="fill" objectFit="cover"/>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-xl">{item.alt}</span>
              </div>
            </div>
          ))}
        </div>
        {isModalOpen && selectedItem && (
          <Dialog open={isModalOpen} onClose={closeModal} className="fixed inset-0 z-50 overflow-y-auto">
            <Dialog.Overlay className="fixed inset-0 bg-black/60" />
            <div className="flex items-center justify-center min-h-screen">
              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-xl m-4 max-w-lg w-full p-12 overflow-hidden">
                <Dialog.Title as="h3" className="text-4xl font-medium leading-6 text-gray-900">
                  {selectedItem.alt}
                </Dialog.Title>
                <div className="mt-4">
                  <p className="text-2xl text-gray-500">
                    {selectedItem.description}
                  </p>
                </div>
                <div className="mt-5 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-lg font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                    onClick={closeModal}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </Dialog>
        )}
      </div>
    );
  }