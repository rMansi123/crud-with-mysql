import { useEffect, useState } from "react";
import "./App.css";
import { addPeople, deletePeople, getUsers, updatePeople } from "./api/api";

function App() {
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterData, setFilterData] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const resonse = await getUsers();
      setUserData(resonse?.data);
      setFilterData(resonse?.data);
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    const filterData = userData?.filter((user) => {
      const data = `${user.name} ${user.email}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return data;
    });
    setFilterData(filterData);
  }, [searchQuery, userData]);

  const handleSubmit = async () => {
    try {
      if (editId) {
        const dataTosend = {
          id: editId,
          name,
          email,
        };
        const result = await updatePeople(dataTosend);
        if (result.data.success) {
          fetchUserData();
          resetForm();
        }
      } else {
        const dataTosend = {
          name,
          email,
        };
        const result = await addPeople(dataTosend);
        if (result.data.success) {
          fetchUserData();
          resetForm();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await deletePeople(id);
      if (result.data.success) {
        fetchUserData();
      }
    } catch (error) {
      console.error("Error deleting people", error);
    }
  };

  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setEditId(user.id);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setEditId(null);
  };
  return (
    <>
      <div className="">
        <div className="flex justify-between px-4 py-2 text-black font-medium text-md xl:text-lg bg-purpletacx rounded-md">
          <p>Title </p>
          <input
            className="border p-2 font-normal "
            type="text"
            placeholder="Search here...."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-blue-50 text-blue-500 px-6 py-2 hover:bg-green-50 hover:text-green-500" onClick={()=> {
            resetForm();
          }}>
            Add New People
          </button>
        </div>
        <div className="flex justify-between px-2 py-1 bg-pink-300 text-black font-bold">
          <div>Name</div>
          <div>Email</div>
        </div>
        {filterData?.length > 0 ? (
          filterData.map((user) => (
            <>
              <div
                key={user?.id}
                className="flex justify-between px-2 py-1 text-black rounded-lg"
              >
                <div>{user?.name}</div>
                <div>{user?.email}</div>
                <div>
                  <button
                    className="border p-2"
                    onClick={() => {
                      handleDelete(user?.id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="border p-2"
                    onClick={() => {
                      handleEdit(user);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </>
          ))
        ) : (
          <>
            <p className="text-xl">No data found !!!</p>
          </>
        )}
        <div className="flex flex-col justify-center items-center content-center">
          <div className="mt-5 w-[50%]">
            <p>Name:</p>
            <input
              className="border p-2 w-full"
              type="text"
              placeholder="First name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-3 w-[50%]">
            <p>Email:</p>
            <input
              className="border p-2 w-full"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            className="bg-green-50 text-green-500 hover:bg-green-200 hover:text-green-700 px-6 py-2 mt-10"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
