import { useRouter } from "next/router";
const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    // access the user session
    const session = getSession(ctx.req, ctx.res);
    const stripeId = session.user[`${process.env.BASE_URL}/stripe_customer_id`];
    const paymentIntents = await stripe.paymentIntents.list({
      customer: stripeId,
    });
    return { props: { orders: paymentIntents.data } };
  },
});

export default function Profile({ user, orders }) {
  const route = useRouter();

  return (
    user && (
      <div className="m-4 p-3">
        <img src={user.picture} alt={user.name} />
        <h1 className=" p-3">{user.name}</h1>
        <p className="p-3">{user.email}</p>
        <p className="p-3 font-bold">Order History</p>
        <div>
          {orders.map((order) => (
            <div key={order.id} className="mb-3">
              <div className=" bg-gray-100">
                <p className="p-3">Order Number: {order.id}</p>
                {console.log(order)}
                <div className="p-3">Amount: £{order.amount / 100}</div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="w-80 max-w-lg p-3 border-none text-xl mt-3 bg-black text-white cursor-pointer scale-100"
          onClick={() => route.push("/api/auth/logout")}
        >
          Log out
        </button>
      </div>
    )
  );
}
