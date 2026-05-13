"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { mens_kurta } from "../../../Data/mens_kurta";
import ProductCard from "./ProductCard";
import { filters, singleFilter } from "./FilterData";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import RadioGroup from "@mui/material/RadioGroup";
import { useDispatch, useSelector } from "react-redux";
import { findProducts } from "State/Product/Action";
import Pagination from '@mui/material/Pagination';
const sortOptions = [
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Porduct() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();
  const productState = useSelector((store) => store.products);
  console.log("FULL PRODUCT STATE => ", productState);


  const decodedQueryString = decodeURIComponent(location.search);
  const searchParamms = new URLSearchParams(decodedQueryString);
  const colorValue = searchParamms.get("color");
  const sizeValue = searchParamms.get("size");
  const priceValue = searchParamms.get("price");
  const discount = searchParamms.get("discount");
  const sortValue = searchParamms.get("sort");
  const pageNumber = searchParamms.get("page") || 1;
  const stock = searchParamms.get("stock");
  const currentPage = Number(pageNumber) || 1;
  


const handlePaginationChange = (event, value) => {
  const searchParams = new URLSearchParams(location.search);
  searchParams.set("page", value);
  navigate({ search: `?${searchParams.toString()}` });
  //  window.scrollTo({ top: 0, behavior: "smooth" }); // 🔥 add this
};



  const handleFilter = (value, sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    const SINGLE_SELECT_FILTERS = ["price", "discount", "stock"];

    // 🔥 SINGLE SELECT (radio behavior)
    if (SINGLE_SELECT_FILTERS.includes(sectionId)) {
      searchParams.set(sectionId, value);
      navigate({ search: `?${searchParams.toString()}` });
      return;
    }

    // ✅ MULTI SELECT (checkbox behavior)
    let filterValues = searchParams.get(sectionId)?.split(",") || [];

    if (filterValues.includes(value)) {
      filterValues = filterValues.filter((v) => v !== value);
    } else {
      filterValues.push(value);
    }

    if (filterValues.length === 0) {
      searchParams.delete(sectionId);
    } else {
      searchParams.set(sectionId, filterValues.join(","));
    }

    navigate({ search: `?${searchParams.toString()}` });
  };

  const handleRadioFilterChange = (e, sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    const currentValue = searchParams.get(sectionId);
    const newValue = e.target.value;

    // 🔁 If same value clicked again → deselect
    if (currentValue === newValue) {
      searchParams.delete(sectionId);
    } else {
      searchParams.set(sectionId, newValue);
    }

    navigate({ search: `?${searchParams.toString()}` });
  };

  useEffect(() => {
console.log(param);
console.log(param.lavelThree);
    const [minPrice, maxPrice] =
      priceValue === null ? [0, 0] : priceValue.split("-").map(Number);
      console.log("COLOR VALUE:", colorValue);

 const data = {
  category: param.lavelThree,
  sizes: sizeValue ? sizeValue.split(",") : [],
  colors: colorValue ? colorValue.split(",") : [],
  sort: sortValue || "price_low",
  pageNumber: pageNumber - 1,
  pageSize: 4,
};

if (priceValue) {
  const [min, max] = priceValue.split("-").map(Number);
  data.minPrice = min;
  data.maxPrice = max;
}

if (discount) {
  data.minDiscount = discount;
}

if (stock) {
  data.stock = stock;
}
    dispatch(findProducts(data));
  }, [
    param.lavelThree,
    colorValue,
    sizeValue,
    priceValue,
    discount,
    sortValue,
    pageNumber,
    stock,
  ]);
  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="size-5 group-data-open:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="size-5 group-not-data-open:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  defaultValue={option.value}
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden",
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              {/* Filters */}

              <div>
                <div className="py-10 flex justify-between items-center">
                  <h1 className="text-lg opacity-50 font-bold">Filters</h1>
                  <FilterListIcon />
                </div>
                <form className="hidden lg:block ">
                  {filters.map((section) => (
                    <Disclosure
                      key={section.id}
                      as="div"
                      className="border-b border-gray-200 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    aria-hidden="true"
                                    className="size-5 group-not-data-open:hidden"
                                  />
                                ) : (
                                  <PlusIcon
                                    aria-hidden="true"
                                    className="size-5 group-data-open:hidden"
                                  />
                                )}
                              </span>
                            </DisclosureButton>
                          </h3>

                          <DisclosurePanel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div key={option.value} className="flex gap-3">
                                  <div className="flex h-5 shrink-0 items-center">
                                    <div className="group grid size-4 grid-cols-1">
                                      <input
                                        onChange={() =>
                                          handleFilter(option.value, section.id)
                                        }
                                        defaultValue={option.value}
                                        defaultChecked={option.checked}
                                        id={`filter-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        type="checkbox"
                                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                      />
                                      <svg
                                        fill="none"
                                        viewBox="0 0 14 14"
                                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                      >
                                        <path
                                          d="M3 8L6 11L11 3.5"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          className="opacity-0 group-has-checked:opacity-100"
                                        />
                                        <path
                                          d="M3 7H11"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          className="opacity-0 group-has-indeterminate:opacity-100"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </DisclosurePanel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                  {singleFilter.map((section) => (
                    <Disclosure
                      key={section.id}
                      as="div"
                      className="border-b border-gray-200 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              {/* <span className="font-medium text-gray-900"></span> */}
                              <FormLabel
                                sx={{ color: "black" }}
                                className="text-gray-900"
                                id="demo-radio-buttons-group-label"
                              >
                                {section.name}
                              </FormLabel>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    aria-hidden="true"
                                    className="size-5 group-not-data-open:hidden"
                                  />
                                ) : (
                                  <PlusIcon
                                    aria-hidden="true"
                                    className="size-5 group-data-open:hidden"
                                  />
                                )}
                              </span>
                            </DisclosureButton>
                          </h3>
                          <DisclosurePanel className="pt-6">
                            <div className="space-y-4">
                              <FormControl>
                                <RadioGroup
                                  aria-labelledby="demo-radio-buttons-group-label"
                                  // defaultValue="female"
                                  name={section.id}
                                  value={
                                    new URLSearchParams(location.search).get(
                                      section.id,
                                    ) || ""
                                  }
                                  onChange={(e) =>
                                    handleRadioFilterChange(e, section.id)
                                  }
                                >
                                  {section.options.map((option, optionIdx) => (
                                    <>
                                      {/* <FormControlLabel onChange={(e)=>handleRadioFilterChange(e,section.id)} value={option.value} control={<Radio />} label={option.label} /> */}
                                      <FormControlLabel
                                        key={option.value}
                                        value={option.value}
                                        control={
                                          <Radio
                                            onClick={() => {
                                              const searchParams =
                                                new URLSearchParams(
                                                  location.search,
                                                );
                                              const currentValue =
                                                searchParams.get(section.id);

                                              if (
                                                currentValue === option.value
                                              ) {
                                                searchParams.delete(section.id);
                                                navigate({
                                                  search: `?${searchParams.toString()}`,
                                                });
                                              }
                                            }}
                                          />
                                        }
                                        label={option.label}
                                      />
                                    </>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                            </div>
                          </DisclosurePanel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </div>

              {/* Product grid */}
              
              <div className="lg:col-span-4 w-full">
                
                <div className="flex flex-wrap justify-center bg-white py-5">
                  {productState.products?.content?.map((item, index) => {
  return <ProductCard key={index} product={item} />;
})}
                </div>
              </div>
            </div>
          </section>
          <section className="w-full px=[3.6rem]">
            <div className="px-4 py-5 flex justify-center">
 <Pagination
  count={productState.products?.totalPages || 1}
  page={currentPage}   // 🔥 THIS LINE FIXES YOUR ISSUE
  onChange={handlePaginationChange}
  color="secondary"
/>

            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
