"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import api from "@/app/lib/api";

// Define the book type
export interface Book {
  id: string;
  title: string;
  author: string;
  publishedDate?: string;
}

// Define context value type
interface BookContextType {
  selectedBook: Book[];
  recommendedBooks: Book[];
  suggestedBooks: Book[];
  loading: boolean;
  error: string | null;
  refreshBooks: () => Promise<void>;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [selectedBook, setSelectedBook] = useState<Book[]>([]);
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [suggestedBooks, setSuggestedBooks]= useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch books from API
  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const selectedResponse = await api.get<Book[]>("/getBooks?status=selected");
      const recommendedResponse = await api.get<Book[]>("/getBooks?status=recommended"); 
      const suggestedResponse = await api.get<Book[]>("getBooks?status=suggested")// Adjust endpoint
      setSelectedBook(selectedResponse.data);
      setRecommendedBooks(recommendedResponse.data);
      setSuggestedBooks(suggestedResponse.data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider value={{ selectedBook, recommendedBooks, suggestedBooks, loading, error, refreshBooks: fetchBooks }}>
      {children}
    </BookContext.Provider>
  );
};

// Custom hook to use the BookContext
export const useBooks = (): BookContextType => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBooks must be used within a BookProvider");
  }
  return context;
};
