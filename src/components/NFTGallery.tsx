import React from "react";
import nftList from "../data/nfts.json";
import { CrossmintEmbeddedCheckout, CrossmintProvider } from "@crossmint/client-sdk-react-ui";

const API_KEY = "ck_production_5ejoH34XvGYELRyU3vCakPL83cszu...";
const COLLECTION_ID = "963ecd12-05a4-45ec-8234-82b198fae077";

export default function NFTGallery() {
  console.log("DEBUG – nftList:", nftList);
nftList.forEach(nft => {
  console.log("✅ TEST LOCATOR", `crossmint:${COLLECTION_ID}:${nft.templateId}`);
});

  return (
    <CrossmintProvider apiKey={API_KEY}>
      <div style={styles.wrapper}>
        <h1 style={styles.header}>The Travelers – Park Avenue Collection</h1>
        <div style={styles.grid}>
          {nftList.map((nft) => (
            <div key={nft.id} style={styles.card}>
              <h2 style={styles.title}>{nft.title}</h2>

              {nft.video ? (
                <video
                  src={nft.video}
                  controls
                  style={styles.media}
                  poster={nft.image}
                />
              ) : (
                <img
                  src={nft.image}
                  alt={nft.title}
                  style={styles.media}
                />
              )}

              <p style={styles.description}>{nft.description}</p>

              <div style={{ marginTop: "1rem" }}>
                <CrossmintEmbeddedCheckout
                  lineItems={{[
                    collectionLocator: `crossmint:${COLLECTION_ID}:${nft.templateId}`,
                    callData: { quantity: 1 }
                  }]}
                  payment={{
                    fiat: { enabled: true },
                    crypto: { enabled: true }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </CrossmintProvider>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    padding: "2rem",
    fontFamily: "Inter, sans-serif"
  },
  header: {
    textAlign: "center",
    fontSize: "2.5rem",
    marginBottom: "2rem"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "2rem"
  },
  card: {
    border: "1px solid #eee",
    borderRadius: "16px",
    padding: "1.5rem",
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)"
  },
  title: {
    fontSize: "1.4rem",
    marginBottom: "1rem"
  },
  media: {
    width: "100%",
    maxHeight: "360px",
    objectFit: "cover",
    borderRadius: "12px"
  },
  description: {
    marginTop: "1rem",
    fontSize: "1rem",
    color: "#444"
  }
};
