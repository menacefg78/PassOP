import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();

  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) setPasswordArray(JSON.parse(passwords));
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("icons/hidden.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/hidden.png";
      passwordRef.current.type = "text";
    }
  };

  const savePassword = () => {
    const { site, username, password } = form;
    if (site.length <= 3 || username.length <= 3 || password.length <= 3) {
      toast.error("All fields must be greater than 3 characters");
      return;
    }

    if (editIndex !== null) {
      const updatedArray = [...passwordArray];
      updatedArray[editIndex] = form;
      setPasswordArray(updatedArray);
      localStorage.setItem("passwords", JSON.stringify(updatedArray));
      setEditIndex(null);
      toast.success("Password updated successfully");
    } else {
      const updatedArray = [...passwordArray, form];
      setPasswordArray(updatedArray);
      localStorage.setItem("passwords", JSON.stringify(updatedArray));
      toast.success("Password saved successfully");
    }

    setform({ site: "", username: "", password: "" });
  };

  const handleChange = (e) => setform({ ...form, [e.target.name]: e.target.value });
  const copyToClipboard = (text) => {
    toast.success("Copied to clipboard");
    navigator.clipboard.writeText(text);
  };
  const deletePassword = (index) => {
    const updatedArray = passwordArray.filter((_, i) => i !== index);
    setPasswordArray(updatedArray);
    localStorage.setItem("passwords", JSON.stringify(updatedArray));
    toast.success("Password deleted successfully");
  };
  const editPassword = (index) => {
    setform(passwordArray[index]);
    setEditIndex(index);
    toast.info("Editing password...");
  };
  const togglePasswordVisibility = (id) => {
    const elem = document.getElementById(`password-${id}`);
    elem.type = elem.type === "password" ? "text" : "password";
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#bbf7d0_100%)]"></div>

      <div className="p-4 md:p-0 md:mycontainer">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">
          <span className="text-green-500">&lt;</span>Pass
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-700 text-base sm:text-lg text-center mb-6">
          Your own password manager
        </p>

        {/* Input Form */}
        <div className="flex flex-col gap-3 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-green-500 w-full sm:w-96 p-3 sm:p-4"
            type="text"
            name="site"
          />

          <div className="flex flex-col sm:flex-row w-full sm:w-96 justify-between gap-3 sm:gap-4">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full sm:w-1/2 p-3 sm:p-4"
              type="text"
              name="username"
            />
            <div className="relative w-full sm:w-1/2">
              <span
                className="absolute right-2 top-2 cursor-pointer"
                onClick={showPassword}
              >
                <img ref={ref} className="p-1" width={26} src="icons/eye.png" alt="" />
              </span>
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-3 sm:p-4"
                type="password"
                name="password"
              />
            </div>
          </div>

          <button
            onClick={savePassword}
            className="gap-2 flex justify-center items-center bg-green-500 rounded-full px-4 py-2 w-fit hover:bg-green-300 border border-green-800 mt-2"
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
              style={{ width: "25px", height: "25px" }}
            ></lord-icon>
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        {/* Password Table */}
        <div className="passwords mt-6 overflow-x-auto">
          <h2 className="font-bold text-2xl sm:text-3xl text-green-800 text-center mb-4 sm:mb-6">
            Your Passwords
          </h2>

          {passwordArray.length === 0 ? (
            <div className="flex justify-center items-center">
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-md text-base sm:text-lg font-medium">
                No Passwords To Show
              </div>
            </div>
          ) : (
            <table className="table-auto w-full min-w-[500px] sm:min-w-[600px] overflow-x-auto rounded-xl shadow-lg">
              <thead className="bg-green-800 text-white text-sm sm:text-lg">
                <tr>
                  <th className="py-2 sm:py-3">Site</th>
                  <th className="py-2 sm:py-3">Username</th>
                  <th className="py-2 sm:py-3">Password</th>
                  <th className="py-2 sm:py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100 text-green-900 text-sm sm:text-base">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center py-1 sm:py-2 border border-white">
                      <div className="flex justify-center items-center gap-2">
                        <a
                          href={item.site}
                          target="_blank"
                          rel="noreferrer"
                          className="text-green-700 font-medium hover:underline truncate max-w-[120px] sm:max-w-[180px]"
                        >
                          {item.site}
                        </a>
                        <button
                          onClick={() => copyToClipboard(item.site)}
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-200 hover:bg-green-400 flex items-center justify-center"
                          title="Copy site"
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/fspidoxv.json"
                            trigger="hover"
                            colors="primary:#166534"
                            style={{ width: "16px", height: "16px" }}
                          ></lord-icon>
                        </button>
                      </div>
                    </td>

                    <td className="text-center py-1 sm:py-2 border border-white">
                      <div className="flex justify-center items-center gap-2">
                        <span className="text-green-700 font-medium truncate max-w-[100px] sm:max-w-[140px]">
                          {item.username}
                        </span>
                        <button
                          onClick={() => copyToClipboard(item.username)}
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-200 hover:bg-green-400 flex items-center justify-center"
                          title="Copy username"
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/fspidoxv.json"
                            trigger="hover"
                            colors="primary:#166534"
                            style={{ width: "16px", height: "16px" }}
                          ></lord-icon>
                        </button>
                      </div>
                    </td>

                    <td className="text-center py-1 sm:py-2 border border-white">
                      <div className="flex justify-center items-center gap-2">
                        <input
                          id={`password-${index}`}
                          type="password"
                          value={item.password}
                          readOnly
                          className="bg-transparent text-green-700 font-medium text-center w-24 sm:w-28 truncate"
                        />
                        <button
                          onClick={() => togglePasswordVisibility(index)}
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-200 hover:bg-green-400 flex items-center justify-center"
                          title="Show/Hide password"
                        >
                          <img src="icons/eye.png" alt="toggle" className="w-4 sm:w-5 h-4 sm:h-5" />
                        </button>
                        <button
                          onClick={() => copyToClipboard(item.password)}
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-200 hover:bg-green-400 flex items-center justify-center"
                          title="Copy password"
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/fspidoxv.json"
                            trigger="hover"
                            colors="primary:#166534"
                            style={{ width: "16px", height: "16px" }}
                          ></lord-icon>
                        </button>
                      </div>
                    </td>

                    <td className="text-center py-1 sm:py-2 border border-white">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() => editPassword(index)}
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-yellow-200 hover:bg-yellow-400 flex items-center justify-center"
                          title="Edit"
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            style={{ width: "16px", height: "16px" }}
                          ></lord-icon>
                        </button>
                        <button
                          onClick={() => deletePassword(index)}
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-200 hover:bg-red-400 flex items-center justify-center"
                          title="Delete"
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/kfzfxczd.json"
                            trigger="hover"
                            colors="primary:#991b1b"
                            style={{ width: "16px", height: "16px" }}
                          ></lord-icon>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
