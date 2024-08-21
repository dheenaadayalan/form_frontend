import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Response from "../Pages/Response";
import Forms from "../Pages/Forms";
import AddForms from "../Pages/AddForms";
import Profile from "../Pages/Profile";
import { useState } from "react";
import EditForm from "../Pages/EditForm";
import FormsResp from "../Components/FormsResp";
import Thanks from "../Pages/Thanks";
import FormResponses from "../Pages/FormResponses";

function App() {
  const [formId, setFormId] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/response" element={<Response setFormId={setFormId}/>} />
        <Route path="/forms" element={<Forms setFormId={setFormId} />} />
        <Route path="/add/form" element={<AddForms />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/edit/form/:id" element={<EditForm formId={formId} />} />
        <Route path="/all/responses/:id" element={<FormResponses formId={formId} />} />
        <Route path="/form/:id" element={<FormsResp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
