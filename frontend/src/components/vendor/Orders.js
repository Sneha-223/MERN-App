import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Orders = (props) => {

    const navigate = useNavigate();
    let userID = localStorage.getItem("USER_ID");
    const [user, setUser] = useState("");
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState();
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

    const rejectOrder = (event) => {

        const newOrder = {
            status: "Rejected"
        };
        console.log(newOrder.status);
        console.log(event);
        axios
            .post("http://localhost:4000/order/status/" + event, newOrder)
            .then((response) => {
                alert("Edited\t" + response.data);
                // console.log(response.data);
                // console.log("here");
            });
    };

    const nextStage = (event) => {

        if (event.status == "Placed") {
            stat = "Dispatched"
        };

        if (event.status == "Dispatched") {
            stat = "In Transit"
        };

        if (event.status == "In Transit") {
            stat = "Delivered"
        };

        const newOrder = {
            status: stat,
        }
        console.log(newOrder.status);
        console.log(event);
        axios
            .post("http://localhost:4000/order/status/" + event._id, newOrder)
            .then((response) => {
                alert("Edited\t" + response.data);
                // console.log(response.data);
                // console.log("here");
            });
    };

    return (

        <div>

            <Grid container align={"center"} spacing={2}>

                <Grid item xs={12}>
                    <h2>ORDERS</h2>
                </Grid>
            </Grid>

            <Grid container>

                <Grid item xs={12}>

                </Grid>

                <Grid item xs={12} md={9} lg={9}>
                    <Paper>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Sr No.</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Shop</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((order, ind) => (
                                    <TableRow key={ind}>
                                        <TableCell>{ind}</TableCell>
                                        <TableCell>{order.date}</TableCell>
                                        <TableCell>{order.itemName}</TableCell>
                                        <TableCell>{order.cost}</TableCell>
                                        <TableCell>{order.quantity}</TableCell>
                                        <TableCell>{order.shop}</TableCell>
                                        <TableCell>{order.status}</TableCell>
                                        <TableCell><a href="#" onClick={() => { nextStage(order) }}>Next stage</a>  <a href="#" onClick={() => { rejectOrder(order._id) }}>Reject</a></TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default Orders;