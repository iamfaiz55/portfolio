import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineFolderOpen,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";

type NavLink = {
  name: string;
  href: string;
  Icon: React.ComponentType<{ size?: string | number }>;
};

const links: NavLink[] = [
  { name: "Dashboard", href: "/admin", Icon: AiOutlineDashboard },
  { name: "Contacts", href: "/admin/contacts", Icon: AiOutlineUser },
  { name: "All Projects", href: "/admin/projects", Icon: AiOutlineFolderOpen },
  {
    name: "Add Project",
    href: "/admin/add-project",
    Icon: AiOutlinePlusCircle,
  },
];

const AdminNavbar: React.FC = () => {
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);

  const baseSize = 26;
  const hoverScale = 1.2;
  // const shrinkScale = 0.85;

  // Max icon container size to avoid container growing on hover
  const maxIconSize = baseSize * hoverScale;

  return (
    <div className="mb-10">
      <nav className="bg-purple-50 shadow-md fixed w-full top-0 left-0 z-50 ">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between ">
          {/* Remove title on small screens; if you want, add a purple brand here */}
          {/* <div className="text-purple-700 font-bold text-2xl hidden md:block">
          Shaikh Faiz
        </div> */}

          <ul className="flex gap-6 sm:gap-10 items-center justify-center flex-grow">
            {links.map(({ name, href, Icon }, i) => {
              const isHovered = hoverIndex === i;

              return (
                <motion.li
                  key={name}
                  onMouseEnter={() => setHoverIndex(i)}
                  onMouseLeave={() => setHoverIndex(null)}
                  className="relative cursor-pointer flex flex-col items-center"
                  animate={{
                    opacity: isHovered || hoverIndex === null ? 1 : 0.6,
                  }}
                  transition={{ type: "spring", stiffness: 250, damping: 20 }}
                  style={{
                    width: maxIconSize,
                    height: maxIconSize,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "visible",
                    transformOrigin: "center",
                  }}
                >
                  <Link
                    to={href}
                    className="text-purple-700 hover:text-purple-900 transition-colors"
                  >
                    <motion.div
                      animate={{
                        scale: isHovered ? hoverScale : 1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 250,
                        damping: 20,
                      }}
                      style={{ display: "inline-block" }}
                    >
                      <Icon size={baseSize} />
                    </motion.div>
                  </Link>

                  {/* Tooltip */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.span
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-10 bg-purple-700 text-white text-xs md:text-sm rounded px-2 py-1 shadow-lg whitespace-nowrap hidden sm:block"
                      >
                        {name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
            <motion.li
              key={"logout"}
              className="relative cursor-pointer flex flex-col items-center"
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              style={{
                width: maxIconSize,
                height: maxIconSize,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "visible",
                transformOrigin: "center",
              }}
            >
              <a className="text-purple-700 hover:text-purple-900 transition-colors">
                <motion.div
                  transition={{ type: "spring", stiffness: 250, damping: 20 }}
                  style={{ display: "inline-block" }}
                >
                  <BiLogOut size={baseSize} />
                </motion.div>
              </a>
            </motion.li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default AdminNavbar;
