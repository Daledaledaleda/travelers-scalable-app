import React from "react";
import { useParams } from "react-router-dom";
import nftList from "../data/nfts.json";
import {
  CrossmintEmbeddedCheckout,
  CrossmintProvider,
} from "@crossmint/client-sdk-react-ui";

// ✅ API Key en entorno de producción
const API_KEY =
  "ck_production_5ejoH34XvGYELRyU3vCakPL83cszuXJy4VTZPLcA7CK5mTE6kKRw8E9rX2SfmtnZbCQLAzBU4qH7e4F4YHssPA8MCjsDrhZzjg8C9P2xU4K8NsrxkiF9saiafRi3cgh54twvjDauVyErAQsYy9d9Rdj4SFDoYqaJpR7w5oG3bWe4pjt7BVqf6mUCnt1aD5q9jGeV7HfvYEzeQzcFBJd67gTQ";

export default function NFTViewer() {
  const { id } = useParams();
  const nft = nftList.find((nft) => nft.id === id);

  if (!nft) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "3rem" }}>
        NFT not found
      </h2>
    );
  }

  // 🔍 Verificación en consola
  console.log(
    "DEBUG – usando collectionLocator:",
    `crossmint:${nft.collectionId}:${nft.templateId}`
  );

  return (
    <CrossmintProvider apiKey={API_KEY}>
      <div style={styles.container}>
        <h1 style={styles.title}>{nft.title}</h1>

        {nft.video ? (
          <video
            controls
            style={styles.media}
            poster={nft.image}
            src={nft.video}
          />
        ) : (
          <img src={nft.image} alt={nft.title} style={styles.media} />
        )}

        <p style={styles.description}>{nft.description}</p>

        <div style={{ marginTop: "2rem" }}>
          <CrossmintEmbeddedCheckout
            lineItems={{
              collectionLocator: `crossmint:${nft.collectionId}:${nft.templateId}`,
              callData: { quantity: 1 },
            }}
            payment={{
              fiat: { enabled: true },
              crypto: { enabled: true },
            }}
          />
        </div>
      </div>
    </CrossmintProvider>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "2rem",
    maxWidth: "700px",
    margin: "0 auto",
    textAlign: "center",
    fontFamily: "Inter, sans-serif",
  },
  title: {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "1rem",
  },
  media: {
    width: "100%",
    maxWidth: "480px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
  description: {
    marginTop: "1.25rem",
    fontSize: "1.1rem",
    lineHeight: 1.6,
    color: "#444",
  },
};

