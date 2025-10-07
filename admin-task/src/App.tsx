type AppProps = {
  children: React.ReactNode;
};

export default function App({ children }: AppProps) {
  return <div className="flex flex-col min-h-screen">{children}</div>;
}
