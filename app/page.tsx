"use client";
import React, { MouseEventHandler, useEffect, useState } from "react";

type Card = {
  id: number;
  title: string;
  linkTitle: string;
  link: string;
  text?: string;
};

interface CardProps {
  title: string;
  text?: string;
  target: React.HTMLAttributeAnchorTarget;
  linkTitle: string;
  href: string;
  rel?: string;
  onClick: MouseEventHandler;
  linkClassName: string;
}

function Card(props: CardProps) {
  return (
    <div className="card w-[150px] h-[150px] m-10 p-5 flex flex-col items-center justify-center bg-gray-200 rounded drop-shadow-md">
      <div className="card__title font-bold">{props.title}</div>
      <div className="card__text">{props.text}</div>
      <a
        className={`default-link card__link ${props.linkClassName} underline text-blue-500`}
        target={props.target}
        rel={props.rel}
        href={props.href}
        onClick={props.onClick}
      >
        {props.linkTitle}
      </a>
    </div>
  );
}

export default function Home() {
  const [cards, setCards] = useState<Card[]>([]);

  const fetchPosts = async () => {
    var data = await fetch(
      "https://my-json-server.typicode.com/savayer/demo/posts"
    );
    let json = await data.json();
    let newData: Card[] = json.map((item: any) => {
      return {
        id: item.id,
        title: item.title.en,
        linkTitle: item.link_title,
        link: item.link,
        text: item.body ? item.body.en : null,
      };
    });

    setCards(newData);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  function analyticsTrackClick(url: string) {
    // sending clicked link url to analytics
    console.log(url);
  }

  return (
    <div className="flex items-center">
      {cards.map(function (item) {
        return (
          <Card
            key={item.id}
            title={item.title}
            linkTitle={item.linkTitle}
            href={item.link}
            text={item.text}
            linkClassName={item.id == 1 ? "card__link--red" : ""}
            target={item.id == 1 ? "_blank" : ""}
            onClick={() => analyticsTrackClick(item.link)}
          />
        );
      })}
    </div>
  );
}
