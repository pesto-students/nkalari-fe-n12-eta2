import React, { Component } from "react";
import "./index.css";
import { connect, useSelector } from "react-redux";
import { userActions } from "./../../actions/user.action";
import Diamonds from "./../../images/Diamonds.png";
import Navbar from "../navbar/Navbar";
import Stripe from "./../stripe";
import Chart from "./Chart";
import Table, { SelectColumnFilter } from "./Table";

const getData = () => [
  {
    name: "Top Up",
    type: "Credit",
    amount: "2000 Diamonds",
    department: "Optimization",
    status: "Active",
    Filter: SelectColumnFilter, // new
    filter: "includes",
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Top Up",
    type: "Credit",
    amount: "1200 Diamonds",
    department: "Intranet",
    status: "Active",
    Filter: SelectColumnFilter, // new
    filter: "includes",
    imgUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Esther Howard",
    type: "Debit",
    amount: "500 Diamonds",
    department: "Directives",
    status: "Active",
    Filter: SelectColumnFilter, // new
    filter: "includes",
    imgUrl:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Top-up",
    type: "Credit",
    amount: "1200 Diamonds",
    department: "Program",
    status: "Active",
    Filter: SelectColumnFilter, // new
    filter: "includes",
    imgUrl:
      "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Kristin Watson",
    type: "Debit",
    amount: "2400 Diamonds",
    department: "Mobility",
    status: "Active",
    Filter: SelectColumnFilter, // new
    filter: "includes",
    imgUrl:
      "https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Cameron Williamson",
    type: "Debit",
    amount: "100 Diamonds",
    department: "Security",
    status: "Active",
    Filter: SelectColumnFilter, // new
    filter: "includes",
    imgUrl:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
];

function Wallet(props) {
  // this.props.getTransactions();

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      {
        Header: "Type",
        accessor: "type",
      },
    ],
    []
  );

  const data = React.useMemo(() => getData(), []);

  console.log(props, "props");

  // const ctx = document.getElementById('myChart').getContext('2d');

  // const data = {
  //     labels: [
  //         'Food & beverages',
  //         'Groceries',
  //         'Gaming',
  //         'Trip & holiday',
  //     ],
  //     datasets: [{
  //         label: 'Total Expenses',
  //         data: [148, 150, 130, 170],
  //         backgroundColor: [
  //             '#3B82F6',
  //             '#10B981',
  //             '#6366F1',
  //             '#F59E0B'
  //         ]
  //     }]
  // };

  // const config = {
  //     type: 'polarArea',
  //     data: data,
  //     options: {
  //         plugins: {
  //             legend: {
  //                 position: 'bottom',
  //             },
  //         }
  //     }
  // };

  // const chart = new Chart(ctx, config);

  return (
    <main class="mx-w-6xl mx-auto py-4 ml-28">
      <div class="flex flex-col space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 px-4 xl:p-0 gap-y-4 md:gap-6">
          <div class="md:col-span-2 xl:col-span-3 bg-gray-800 bg-opacity-60 p-6 rounded-2xl ">
            <div class="flex flex-col space-y-6 md:h-full md:justify-between">
              <div class="flex justify-between">
                <span class="text-xs text-white font-semibold uppercase tracking-wider">
                  Wallet
                </span>
                <span class="text-xs text-white font-semibold uppercase tracking-wider">
                  Available Diamonds
                </span>
              </div>
              <div class="flex gap-2 md:gap-4 justify-between items-center">
                <div class="flex flex-col space-y-4">
                  <h2 class="text-white font-bold tracking-widest leading-tight">
                    {" "}
                    Jagan's Account
                  </h2>
                  <div class="flex items-center gap-4">
                    <p class="text-lg text-white tracking-wider">
                      **** **** *321
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="white"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
                <h2 class="text-lg md:text-xl xl:text-3xl text-white font-black tracking-wider">
                  <span class="md:text-xl">
                    <img src={Diamonds}></img>
                  </span>
                  {props.currentUser.wallet}
                </h2>
              </div>
              <div class="flex gap-2 md:gap-4">
                <a
                  href="/recharge"
                  class="bg-blue-600 px-5 py-3 w-full text-center md:w-auto rounded-lg text-white text-xs tracking-wider font-semibold hover:bg-blue-800"
                >
                  Recharge
                </a>
                <a
                  href="#"
                  class="bg-blue-50 px-5 py-3 w-full text-center md:w-auto rounded-lg text-blue-600 text-xs tracking-wider font-semibold hover:bg-blue-600 hover:text-white"
                >
                  Withdraw
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-5 items-start px-4 xl:p-0 gap-y-4 md:gap-6">
          <div class="col-start-1 col-end-5">
            <h2 class="text-xs md:text-sm text-white font-bold tracking-wide">
              Summary Transactions
            </h2>
          </div>
          <div class="col-span-2 bg-gray-800 bg-opacity-60 p-6 rounded-xl flex flex-col space-y-6">
            <Chart></Chart>
          </div>
          <div class="col-span-3 bg-gray-800 bg-opacity-60 p-6 rounded-xl  flex flex-col">
            <div class="flex justify-between items-center">
              <h2 class="text-sm text-white font-bold tracking-wide">
                Latest Transactions
              </h2>
            </div>
            <ul class="divide-y-2 divide-gray-100 overflow-x-auto w-full">
              <div className="bg-gray-100 text-gray-900">
                <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                  <div className="">
                    <h1 className="text-xl font-semibold"></h1>
                  </div>
                  <div className="mt-6">
                    <Table columns={columns} data={data} />
                  </div>
                </main>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

function mapState(state) {
  console.log("state", state);
  const { transactions } = state.getTransactions;
  const { currentUser } = state.user;
  return { transactions, currentUser };
}

const actionCreators = {
  getTransactions: userActions.getTransactions,
};

const WalletPage = connect(mapState, actionCreators)(Wallet);

export { WalletPage as Wallet };
