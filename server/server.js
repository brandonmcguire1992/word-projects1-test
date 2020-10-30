const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");

// dotenv config
require("dotenv").config();
console.log(typeof process.env.MONGODB_URI);

const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

const stripe = require('stripe')('sk_test_51HfFq4BJJNpYEWGkbr51tCeGM5BPMEjVLatGmQFya2z40s4IVh9dxrJWObU9N804Nqi3fFUu7nyXICilfwMIC13r001gwstoU8');

app.post('/create-checkout-session/:value', async (req, res) => {
  // const url = new URL(context.headers.referer).origin;

  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      // {
      //   price_data: {
      //     currency: 'usd',
      //     product_data: {
      //       name: 'T-shirt',
      //     },
      //     unit_amount: 2000,
      //   },
      //   quantity: 1,
      // },
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Donate',
          },
          unit_amount: parseInt(req.params.value)*100,
        },
        quantity: 1,
      },

    ],
    mode: 'payment',
    success_url: 'https://yoursite.com/success.html',
    cancel_url: 'https://example.com/cancel',
  });

  res.json({ id: session.id });
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
app.use("/images", express.static(path.join(__dirname, "../client/images")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

// app.listen(4242, () => console.log(`Listening on port ${4242}!`));

