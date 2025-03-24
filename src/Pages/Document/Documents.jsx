import React,{useContext} from 'react';
import { themeContext } from '../../Context';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import { DocumentPath } from '../../Service/ApiService';
import './Document.css'
import { useLocation } from 'react-router-dom';


const Documents = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const location=useLocation();

  const {document}=location.state || {}

  const docs = [{ uri: DocumentPath + document }]; 


  return (
    
      <DocViewer 
      documents={docs} 
      pluginRenderers={DocViewerRenderers} 
    />
    
  );
};

export default Documents;
