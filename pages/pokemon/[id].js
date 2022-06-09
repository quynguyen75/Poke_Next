import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Breadcrumb, Col, Row, Tag, Typography } from "antd";

const { Title } = Typography;

export default function PokemonDetail() {
  const router = useRouter();
  const [pokemon, setPokemon] = useState(null);
  const { id: pokemonId } = router.query;

  const goback = (e) => {
    e.preventDefault();
    router.back();
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [pokemonId]);

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item onClick={goback} href="">
          Home
        </Breadcrumb.Item>
      </Breadcrumb>
      {pokemon && (
        <div>
          <Title
            level={3}
            style={{
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            {pokemon.name}
          </Title>

          <Row justify="center">
            {pokemon.types.map((type) => (
              <Col key={type.slot}>
                <Tag color="red">{type.type.name}</Tag>
              </Col>
            ))}
          </Row>

          <Row justify="center">
            <Col>
              <Image
                src={pokemon.sprites.front_default}
                width={150}
                height={150}
              />
            </Col>
          </Row>

          <Row justify="center" gutter={48}>
            <Col
              style={{
                textAlign: "center",
              }}
            >
              <Title level={4}>Height</Title>
              <Tag>{pokemon.height / 10}m</Tag>
            </Col>

            <Col
              style={{
                textAlign: "center",
              }}
            >
              <Title level={4}>Weight</Title>
              <Tag>{pokemon.weight / 10}kg</Tag>
            </Col>
          </Row>

          <Title
            level={4}
            style={{
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            Abilities
          </Title>
          <Row justify="center" gutter={48}>
            {pokemon.abilities.map((item) => (
              <Col key={item.slot}>
                <Tag color="green">{item.ability.name}</Tag>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
}
