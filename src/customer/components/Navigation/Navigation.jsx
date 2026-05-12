import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import AuthModal from "../../Auth/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "State/Auth/Action";

const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      featured: [],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", id: "top" },
            { name: "Dresses", id: "women_dress" },
            { name: "Women Jeans", id: "women_jeans" },
            { name: "Lengha Choli", id: "lengha_choli" },
            { name: "Sweaters", id: "sweater" },
            { name: "T-Shirts", id: "t-shirt" },
            { name: "Jackets", id: "jacket" },
            { name: "Gouns", id: "gouns" },
            { name: "Sarees", id: "saree" },
            { name: "Kurtas", id: "kurtas" },
          ],
        },
      ],
    },
    {
      id: "men",
      name: "Men",
      featured: [],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Mens Kurtas", id: "mens_kurta" },
            { name: "Shirt", id: "shirt" },
            { name: "Men Jeans", id: "men_jeans" },
            { name: "T-Shirts", id: "t-shirt" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "/" },
    { name: "Stores", href: "/" },
  ],
};

export default function Navigation() {
  const [open, setOpen] = useState(false); // mobile menu
  const [openAuthModal, setOpenAuthModal] = useState(false); // auth modal
  const [anchorEl, setAnchorEl] = useState(null); // user menu
  const [authMode, setAuthMode] = useState("login");

  const navigate = useNavigate();
  const cartItemCount = 2;
  const openUserMenu = Boolean(anchorEl);

  const auth = useSelector((store) => store.auth) || {};

  const dispatch = useDispatch();
  const location = useLocation();
  const jwt = localStorage.getItem("jwt");

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setOpenAuthModal(false);
  };

  const handleOpenAuthModal = (mode = "login") => {
    setAuthMode(mode);
    setOpenAuthModal(true);
  };

  const handleCategoryClick = (category, section, item, close) => {
    navigate(`/${category.id}/${section.id}/${item.id}`);
    close();
  };

  useEffect(() => {
    if (jwt && !auth.user) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.user, dispatch]);

  useEffect(() => {
    if (auth.user) {
      handleClose();
    }
    if (location.pathname === "/login" || location.pathname === "/register") {
      navigate(-1);
    }
  }, [auth.user, location.pathname, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    handleCloseUserMenu();
    setOpenAuthModal(false);
    navigate("/");
  };

  return (
    <div className="bg-white pb-10">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <div className="fixed inset-0 bg-black bg-opacity-25" />

          <Dialog.Panel className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-xl">
            <div className="flex px-4 pt-5">
              <button onClick={() => setOpen(false)}>
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </Dialog.Panel>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-indigo-600 text-sm text-white">
          Get free delivery on orders over $100
        </p>

        <nav className="border-b border-gray-200">
          <div className="flex h-16 items-center px-11">
            <button className="lg:hidden" onClick={() => setOpen(true)}>
              <Bars3Icon className="h-6 w-6" />
            </button>

            <Popover.Group className="hidden lg:ml-8 lg:flex space-x-8">
              {navigation.categories.map((category) => (
                <Popover key={category.name}>
                  {({ close }) => (
                    <>
                      <Popover.Button className="text-sm font-medium">
                        {category.name}
                      </Popover.Button>

                      <Popover.Panel className="absolute z-10 bg-white p-6 shadow">
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p className="font-medium">{section.name}</p>
                            <ul className="mt-4 space-y-2">
                              {section.items.map((item) => (
                                <li
                                  key={item.name}
                                  className="cursor-pointer hover:text-gray-800"
                                  onClick={() =>
                                    handleCategoryClick(
                                      category,
                                      section,
                                      item,
                                      close
                                    )
                                  }
                                >
                                  {item.name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Popover.Panel>
                    </>
                  )}
                </Popover>
              ))}

              {navigation.pages.map((page) => (
                <Link key={page.name} to={page.href}>
                  {page.name}
                </Link>
              ))}
            </Popover.Group>

            <div className="ml-auto flex items-center space-x-6">
              {auth.user?.firstName ? (
                <>
                  <Avatar
                    onClick={handleUserClick}
                    sx={{ bgcolor: deepPurple[500], cursor: "pointer" }}
                  >
                    {auth.user?.firstName?.charAt(0).toUpperCase()}
                  </Avatar>

                  <Menu
                    anchorEl={anchorEl}
                    open={openUserMenu}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem
                      onClick={() => {
                        handleCloseUserMenu();
                        navigate("/account/profile");
                      }}
                    >
                      Profile
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        handleCloseUserMenu();
                        navigate("/account/order");
                      }}
                    >
                      My Orders
                    </MenuItem>

                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <button
                  onClick={() => handleOpenAuthModal("register")}
                  className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                >
                  SIGN IN
                </button>
              )}

              <MagnifyingGlassIcon
                className="h-6 w-6 cursor-pointer"
                onClick={() => navigate("/products/search")}
              />

              <Button onClick={() => navigate("/cart")}>
                <ShoppingBagIcon className="h-6 w-6" />
                <span className="ml-1">{cartItemCount}</span>
              </Button>
            </div>
          </div>
        </nav>
      </header>

      <AuthModal
        open={openAuthModal}
        handleClose={handleClose}
        mode={authMode}
      />
    </div>
  );
}