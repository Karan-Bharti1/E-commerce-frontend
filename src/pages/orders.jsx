import Header from "../../components/Header";
import useFetch from "../../useFetch";
import { useEffect,useState } from "react";
import {Link} from "react-router-dom"
const Orders=()=>{
    const {data,loading}=useFetch("https://e-commerce-backend-lyart-six.vercel.app/orders")
    const [ordersData,setOrdersData]=useState([])
    console.log(data)
    useEffect(()=>{
if(Array.isArray(data)){
    setOrdersData(data)
}else{
    setOrdersData([])
}
    })
    const convertToIST = (utcString) => {
        // Parse the UTC string into a Date object (which is in UTC)
        const utcDate = new Date(utcString);
        console.log("Parsed UTC Date:", utcDate);  // Logs the UTC Date object
      
        // IST is UTC + 5:30, so we add the offset in milliseconds
        const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
        const istDate = new Date(utcDate.getTime() + istOffset);
        console.log("IST Date (raw):", istDate);  // Logs the IST Date after offset applied
      
        // Format the IST date as "YYYY-MM-DD HH:mm:ss"
        const formattedIST = `${istDate.getUTCFullYear()}-${String(istDate.getUTCMonth() + 1).padStart(2, '0')}-${String(istDate.getUTCDate()).padStart(2, '0')} ${String(istDate.getUTCHours()).padStart(2, '0')}:${String(istDate.getUTCMinutes()).padStart(2, '0')}:${String(istDate.getUTCSeconds()).padStart(2, '0')}`;
      
        return formattedIST;
      };
    const displayData=ordersData?.map(order=>(
        <li key={order._id} className="list-group-item">
              <Link to={`/orders/${order._id}`} className="text-decoration-none text-dark">
            <p className="py-2"> <strong>Order Id:</strong> {order._id}{" "}</p>
            {order.items.map(item=>(
                <>
                <img id="orderImage" src={item.productDetails.imgURL} className="img-fluid mx-4"/></>
            ))}
            <p  className="py-2">  <strong>Date and Time: </strong>{convertToIST(order.updatedAt)}</p>
           
            </Link>
        </li>
    )).reverse()
    return(<>
    <Header/>
    <main className="container">
    <Link className="btn" to="/">Home</Link>/<Link to="/products" className="btn">Products</Link>/<Link className="btn" to="/profile">My Profile</Link>/<Link className="btn" to="/orders">My Orders</Link>
        <h2 className="fs-2 py-3">My Orders</h2>
      
        <ul className="list-group my-4">
        {displayData}
        </ul>
       
    </main>
    </>)
}
export default Orders;