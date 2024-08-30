"use client"
import { useEffect, useState } from "react";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [pendingUpdates, setPendingUpdates] = useState([]);
    let flag = 0

    useEffect(() => {
    const fetchPendingUpdates = async() => {
      try {
        const resp = await fetch('api/products/makeRequests');
        if(!resp.ok){
          throw new Error('Network response is not Ok...');
        }

        const data = await resp.json();
        setPendingUpdates(data);

      } catch (error) {
        console.error(error);
        setError('Failed to Update Products...');
      }
    }

    fetchPendingUpdates();
  }, []);

    const handleUpdateRequest = async(id, isApproved) => {
    try {
      const resp = await fetch('api/products/makeRequests',{
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
        },

        body:JSON.stringify({id,isApproved})
      });

      if (!resp.ok) throw new Error('Failed to handle update request');

      await resp.json();

      setPendingUpdates((prev) =>
        prev.filter((update) => update.id !== id)
      );

      setNotifications((prev) => [
        ...prev,
        { alert: `Update request ${isApproved ? 'Approved' : 'Declined'}` },
      ]);
    } catch (error) {
      console.error(error);
      setError('Failed to update Product');
    }
  }

  return(
    <>
        {
          <div className="mt-8">
            <ul>
              {
                pendingUpdates.map((update) => (
                  update.Status === "Pending" ? (
                    <li key={update.id} className="flex justify-between items-center border-b p-2">
                        <div>
                          <h3 className="text-2xl font-semibold">{update.productName}</h3>
                          <p className="mt-2">{update.productDescription}</p>
                          <p className="mt-2 font-bold">{update.price}</p>
                          {/* <p>{update.image}</p> */}
                          <p className="mt-2 font-bold">{update.department}</p>
                        </div>

                        <div>
                          <button onClick={() => handleUpdateRequest(update.id, true)} className="bg-green-500 text-white px-2 py-1 rounded-md mr-2">
                            Approve
                          </button>

                          <button onClick={() => handleUpdateRequest(update.id, false)} className="bg-red-500 text-white px-2 py-1 rounded-md">
                            Decline
                          </button>
                        </div>
                    </li>
                  ) : (
                    null
                  )
                ))
              }
              {
                flag == 0 ? <h1 className="font-semibold text-2xl ml-[600px] mb-[10px] mt-[30px]">No Other Updates</h1> : null
              }
            </ul>
          </div>
        }
    </>
  )
}
export default Notifications;