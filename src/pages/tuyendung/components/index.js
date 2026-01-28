import React from "react";
import "../../../App.css";

import FormProvider from "../store/FormProvider";
import LandingFormPage from "./LandingFormPage";

function TuyendungPage() {
  return (
    <FormProvider>
      <div className="app">
        <LandingFormPage />
      </div>
    </FormProvider>
  );
}

export default TuyendungPage;
