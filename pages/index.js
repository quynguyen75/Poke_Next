import { List, Typography } from "antd";
import { useEffect, useState } from "react";
import Link from "next/link";

import "antd/dist/antd.css";

const { Title } = Typography;

function getId(url) {
  return url.slice(url.indexOf("pokemon/") + 8, url.lastIndexOf("/"));
}

export default function Home() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
        const data = await response.json();

        setPokemons(data.results);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <div>
      <Title
        level={3}
        style={{
          textAlign: "center",
        }}
      >
        Pokemons
      </Title>

      <List
        dataSource={pokemons}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Link href={`/pokemon/${getId(item.url)}`}>{item.name}</Link>
              }
            />
          </List.Item>
        )}
        style={{
          maxWidth: "600px",
          margin: "0 auto",
        }}
      />
    </div>
  );
}
