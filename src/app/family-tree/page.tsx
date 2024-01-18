"use client";

import f3 from "family-chart";

import { useRef, useEffect } from "react";
import familyMembers from "@/app/family-tree/data.json";

export default function FamilyTree() {
  const cont = useRef(null);

  useEffect(() => {
    if (!cont.current) return;

    const store = f3.createStore({
        data: familyMembers,
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
  }, []);

  return <div className="f3" id="FamilyChart" ref={cont}></div>;
}
