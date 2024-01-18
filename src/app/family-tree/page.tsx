"use client";

import f3 from "family-chart";

import { useRef, useEffect } from "react";

export default function FamilyTree() {
  const cont = useRef(null);

  useEffect(() => {
    if (!cont.current) return;

    const store = f3.createStore({
        data: data(),
        node_separation: 250,
        level_separation: 150,
      }),
      view = f3.d3AnimationView({
        store,
        cont: document.querySelector("#FamilyChart"),
      }),
      Card = f3.elements.Card({
        store,
        svg: view.svg,
        card_dim: {
          w: 220,
          h: 70,
          text_x: 75,
          text_y: 15,
          img_w: 60,
          img_h: 60,
          img_x: 5,
          img_y: 5,
        },
        card_display: [
          (d: any) => `${d.data["firstName"]} ${d.data["lastName"]}`,
          (d: any) => `${d.data["birthday"]} ${d.data["placeOfBirth"]}`,
        ],
        mini_tree: true,
        link_break: false,
      });

    view.setCard(Card);
    store.setOnUpdate((props: any) => view.update(props || {}));
    store.update.tree({ initial: true });

    function data() {
      return [
        {
          id: "9ad270aa-a486-41ef-a123-ace2b407dd4e",
          data: {
            gender: "M",
            firstName: "Ben",
            lastName: "Simmon",
            birthday: "11/11/1111",
            avatar: "",
            placeOfBirth: "Vancouver",
          },
          rels: {
            father: "71ad1ed8-ef8b-4558-a1a1-7681b1e026d2",
          },
        },
        {
          id: "71ad1ed8-ef8b-4558-a1a1-7681b1e026d2",
          data: {
            gender: "M",
            firstName: "Jeff",
            lastName: "Simmon",
            birthday: "22/22/2222",
            avatar: "",
            placeOfBirth: "Toronto",
          },
          rels: {
            children: ["9ad270aa-a486-41ef-a123-ace2b407dd4e"],
            spouses: [],
          },
        },
      ];
    }
  }, []);

  return <div className="f3" id="FamilyChart" ref={cont}></div>;
}
