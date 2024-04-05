import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { StreamCall, StreamTheme, StreamVideo, StreamVideoClient, User } from "@stream-io/video-react-sdk";
import "./index.css";

const apiKey = "mmhfdzb5evj2";
const userId = "Talon_Karrde";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiVGFsb25fS2FycmRlIiwiaXNzIjoiaHR0cHM6Ly9wcm9udG8uZ2V0c3RyZWFtLmlvIiwic3ViIjoidXNlci9UYWxvbl9LYXJyZGUiLCJpYXQiOjE3MTIxNjg0NTEsImV4cCI6MTcxMjc3MzI1Nn0.VUj3-9miiTZCaWjxoEyRRb835BAG7AYrQzdu3HJa7xU";
const user: User = { id: userId, name: "Theo" };
const callId = "bIzYldnayZmD";

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("default", callId);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <StreamTheme>
          <App />
        </StreamTheme>
      </StreamCall>
    </StreamVideo>
  </React.StrictMode>,
);
