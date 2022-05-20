import { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from "@mui/material/TextField";


import { useNavigate } from "react-router-dom";

const Orders = (props) => {

    const navigate = useNavigate();
    let userID = localStorage.getItem("USER_ID");
    const [user, setUser] = useState("");
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    let stat = "";

    useEffect(() => {

        userID = localStorage.getItem("USER_ID")

        axios.get('http://localhost:4000/user/' + userID)
            .then(response => {
                console.log(response.data)
                setUser(response.data)
            })
            .catch(error => {
                console.log(error.response.data)
                localStorage.setItem('USER_ID', 0)
            })

    }, []);

    axios
        .get("http://localhost:4000/order/shop/" + user.name)
        .then((response) => {
            setOrders(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

    axios
        .get("http://localhost:4000/product/shop/" + user.name)
        .then((response) => {
            setProducts(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

    let k1 = 0, k2 = 0, k3 = 0, i = 0;
    let a = [0, 0, 0, 0, 0, 0];

    products.forEach(function (product) {

        orders.filter(order => order.itemName == product.name).map(filteredorder => (
            a[i]++
        ))
    });

    orders.forEach(function (order) {

        k1 = k1 + 1;

        if (order.status == "Completed") {
            k3 = k3 + 1;
        }
        else if (order.status == "Placed" || order.status == "Dispatched" || order.status == "In Transit" || order.status == "Delivered") {
            k2 = k2 + 1;
        }
    });

    return (

        <div>

            <Grid container align={"center"}>

            <TableContainer sx={{ maxWidth: 500 }} component={Paper}>
                <Table sx={{ minWidth: 100 }} aria-label="simple table">

                    <TableBody>

                        <TableRow sx={{
                            [`& .${tableCellClasses.root}`]: { borderBottom: "none" }
                        }}>
                            <TableCell style={{ fontWeight: "bold" }}>Orders Placed:</TableCell>
                            <TableCell>{k1}</TableCell>
                        </TableRow>

                        <TableRow sx={{
                            [`& .${tableCellClasses.root}`]: { borderBottom: "none" }
                        }}>
                            <TableCell style={{ fontWeight: "bold" }}>Pending Orders:</TableCell>
                            <TableCell>{k2}</TableCell>
                        </TableRow>

                        <TableRow sx={{
                            [`& .${tableCellClasses.root}`]: { borderBottom: "none" }
                        }}>
                            <TableCell style={{ fontWeight: "bold" }}>Completed Orders:</TableCell>
                            <TableCell >{k3}</TableCell>
                        </TableRow>


                    </TableBody>
                </Table>
            </TableContainer>

            </Grid>

            
        </div>
    );
};

export default Orders;