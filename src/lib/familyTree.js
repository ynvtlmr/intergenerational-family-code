function getInitialFamilyTreeData() {
  return [
    {
      id: "9ad270aa-a486-41ef-a123-ace2b407dd4e",
      data: {
        gender: "M",
        firstName: "FirstName",
        lastName: "LastName",
        birthday: "July 1, 1867",
        avatar: "",
        placeOfBirth: "Ottawa, Canada",
      },
      rels: {},
    },
  ];
}

function createFormModal(materialize) {
  if (document.getElementById("form_modal")) return;

  // Create a new "div" modal element and append it to the document body
  const modal = document.body.appendChild(document.createElement("div"));
  modal.setAttribute("id", "form_modal");
  modal.setAttribute("class", "modal");
  materialize.Modal.init(modal, {});
}

// Define the parameters of the form for editing an individual's data
function cardEditParams() {
  return [
    { type: "text", placeholder: "firstName", key: "firstName" },
    { type: "text", placeholder: "lastName", key: "lastName" },
    { type: "text", placeholder: "birthday", key: "birthday" },
    { type: "text", placeholder: "avatar", key: "avatar" },
    { type: "text", placeholder: "placeOfBirth", key: "placeOfBirth" },
  ];
}

// Format the display of individual information in a family card
function cardDisplay() {
  const d1 = (d) => `${d.data["firstName"] || ""} ${d.data["lastName"] || ""}`,
    d2 = (d) => `${d.data["birthday"] || ""} ${d.data["placeOfBirth"] || ""}`;
  d1.create_form = "{first name} {last name}";
  d2.create_form = "{birthday} {place of birth}";

  return [d1, d2];
}

function form({
  datum,
  rel_datum,
  store,
  rel_type,
  card_edit,
  postSubmit,
  card_display,
  edit: { el, open, close },
}) {
  setupFromHtml();
  open();

  function setupFromHtml() {
    el.innerHTML = `
          <div class="modal-content">
            <form>
              <div>
                <div style="text-align: left">
                  <span style="display: ${
                    datum.to_add || !!rel_datum ? "none" : null
                  }; float: right; cursor: pointer" class="red-text delete">delete</span>
                </div>
                <div>
                  <label><input type="radio" name="gender" value="M" ${
                    datum.data.gender === "M" ? "checked" : ""
                  }><span>male</span></label><br>
                  <label><input type="radio" name="gender" value="F" ${
                    datum.data.gender === "F" ? "checked" : ""
                  }><span>female</span></label><br>
                </div>
              </div>
              ${getEditFields(card_edit)}
              ${
                rel_type === "son" || rel_type === "daughter"
                  ? otherParentSelect()
                  : ""
              }
              <br><br>
              <div style="text-align: center">
                <button type="submit" class="btn">submit</button>
              </div>
            </form>
          </div>
        `;
    el.querySelector("form").addEventListener("submit", submitFormChanges);
    el.querySelector(".delete").addEventListener("click", deletePerson);
  }

  function otherParentSelect() {
    const data_stash = store.getData();
    return `
          <div>
            <label>Select other</label>
            <select name="other_parent" style="display: block">
              ${
                !rel_datum.rels.spouses || rel_datum.rels.spouses.length === 0
                  ? ""
                  : rel_datum.rels.spouses
                      .map((sp_id, i) => {
                        const spouse = data_stash.find((d) => d.id === sp_id);
                        return `<option value="${sp_id}" ${
                          i === 0 ? "selected" : ""
                        }>${card_display[0](spouse)}</option>`;
                      })
                      .join("\n")
              }
              <option value="${"_new"}">NEW</option>
            </select>
          </div>
        `;
  }

  function submitFormChanges(e) {
    e.preventDefault();
    const form_data = new FormData(e.target);
    form_data.forEach((v, k) => (datum.data[k] = v));

    close();
    postSubmit();
  }

  function deletePerson() {
    close();
    postSubmit({ delete: true });
  }

  function getEditFields(card_edit) {
    return card_edit
      .map((d) =>
        d.type === "text"
          ? `<input type="text" name="${d.key}" placeholder="${
              d.placeholder
            }" value="${datum.data[d.key] || ""}">`
          : d.type === "textarea"
          ? `<textarea class="materialize-textarea" name="${
              d.key
            }" placeholder="${d.placeholder}">${
              datum.data[d.key] || ""
            }</textarea>`
          : ""
      )
      .join("\n");
  }
}

export {
  getInitialFamilyTreeData,
  createFormModal,
  cardEditParams,
  cardDisplay,
  form,
};
