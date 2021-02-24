import React, { createContext, useContext } from 'react';

export const GeneralContext = createContext();
export const CodeContext = createContext();
export const MongoContext = createContext();
export const URIContext = createContext();

// creating custom useContext for testing purposes. Jest/Enzyme does not have a way to test and provide consumers context.
export const useGenContext = () => useContext(GeneralContext);
export const useMongoContext = () => useContext(MongoContext);
export const useURIContext = () => useContext(URIContext);