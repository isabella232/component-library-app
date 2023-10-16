"use client";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image, { StaticImageData } from "next/image";

type ComponentModalProps = {
  previewImage: StaticImageData;
  title: string;
  closeModal: () => void;
  open: boolean;
  onAddComponent: () => void;
};

export default function ComponentModal({
  open,
  closeModal,
  title,
  previewImage,
  onAddComponent,
}: ComponentModalProps) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-black px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="flex flex-col space-y-4">
                  <div id="header" className="flex flex-row">
                    <Dialog.Title
                      as="h3"
                      className="grow text-base font-medium leading-6 text-gray-300"
                    >
                      {title}
                    </Dialog.Title>
                    <button
                      type="button"
                      className="inline-flex justify-center px-2 py-2 text-sm font-medium text-gray-300 border border-transparent rounded-md hover:text-gray-500 focus:outline-none"
                      onClick={closeModal}
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                  <div
                    id="body"
                    className="flex items-center h-[200px] relative w-full bg-white/20 p-2 border-0"
                  >
                    <Image
                      src={previewImage}
                      alt={title}
                      className="object-contain w-full h-auto relative bg-transparent"
                    />
                  </div>
                  <div id="footer">
                    <button
                      type="button"
                      className="rounded bg-white/20 w-full px-2 py-1 text-sm text-white hover:bg-white/30"
                      onClick={onAddComponent}
                    >
                      Add Component
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
