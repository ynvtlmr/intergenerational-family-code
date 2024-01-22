"use client";

import f3 from "family-chart";
import "materialize-css/dist/css/materialize.min.css";

import { useEffect } from "react";
import {
  getInitialFamilyTreeData,
  cardDisplay,
  cardEditParams,
  form,
} from "../../lib/familyTree";
import FamilyTreeDataButton from "./family-tree-data-button";

export default function FamilyTree() {
  useEffect(() => {
    // Dynamically import the "materialize-css" library here to avoid SSR issues
    import("materialize-css").then((M) => {
      const cont = document.querySelector("#FamilyChart"),
        // Card dimensions
        card_dim = {
          w: 300,
          h: 70,
          text_x: 75,
          text_y: 15,
          img_w: 60,
          img_h: 60,
          img_x: 5,
          img_y: 5,
        },
        // Format the display of individual information in a family card
        card_display = cardDisplay(),
        // Define the parameters of the form for editing an individual's data
        card_edit = cardEditParams();

      const store = f3.createStore({
          data: getInitialFamilyTreeData(),
          node_separation: 350,
          level_separation: 150,
        }),
        // View initialization
        view = f3.d3AnimationView({
          store,
          cont: document.querySelector("#FamilyChart"),
          card_edit,
        }),
        // Card creation/configuration
        Card = f3.elements.Card({
          store,
          svg: view.svg,
          card_dim,
          card_display,
          mini_tree: true,
          link_break: false,
          cardEditForm,
          addRelative: f3.handlers.AddRelative({
            store,
            cont,
            card_dim,
            cardEditForm,
          }),
        });

      // Set the card to be used in the view
      view.setCard(Card);
      store.setOnUpdate((props: any) => {
        view.update(props || {});
        localStorage.setItem(
          "family-tree-data",
          JSON.stringify(store.getData(), null, 4)
        );
      });
      // Initial tree update
      store.update.tree({ initial: true });

      // Prepare the properties passed to the "Form" function
      function cardEditForm(props: any) {
        const postSubmit = props.postSubmit;
        props.postSubmit = (ps_props: any) => {
          postSubmit(ps_props);
        };
        const el = document.querySelector("#form_modal"),
          modal = M.Modal.getInstance(el as Element),
          // The "edit" object with properties containing the modal element
          // and functions to open and close the modal
          edit = { el, open: () => modal.open(), close: () => modal.close() };
        form({ ...props, card_edit, card_display, edit });
      }
    });
  }, []);

  useEffect(() => {
    // Dynamically import the "materialize-css" library here to avoid SSR issues
    import("materialize-css").then((M) => {
      // Check if an element with the id "form_modal" already exists in the DOM
      if (document.getElementById("form_modal")) return;

      // Create a new "div" modal element and append it to the document body
      const modal = document.body.appendChild(document.createElement("div"));
      modal.setAttribute("id", "form_modal");
      modal.setAttribute("class", "modal");
      M.Modal.init(modal, {});
    });
  }, []);

  return (
    <div className="relative">
      <div className="f3" id="FamilyChart"></div>
      <FamilyTreeDataButton />
    </div>
  );
}
