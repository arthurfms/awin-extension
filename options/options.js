window.addEventListener("load", () => {
  let optionMenus = document.querySelectorAll(".options-section");
  optionMenus.forEach((menu) => {
    menu
      .querySelector(".section-title")
      .addEventListener("click", (evt) =>
        menu.classList.toggle("options-section_open")
      );
    menu
      .querySelector(".section-handler")
      .addEventListener("click", (evt) =>
        menu.classList.toggle("options-section_open")
      );
  });

  // Saves options to chrome.storage
  const saveOptions = () => {
    let activateExtension = document
      .querySelector("#extension-option .option__selection")
      .classList.contains("option__selection_selected")
      ? true
      : false;
    let activateDatafeed = document
      .querySelector("#datafeed .option__selection")
      .classList.contains("option__selection_selected")
      ? true
      : false;
    let sasUI = document
      .querySelector("#sas-ui .option__selection")
      .classList.contains("option__selection_selected")
      ? true
      : false;
    let transactionsScript = document
      .querySelector("#transactions-script .option__selection")
      .classList.contains("option__selection_selected")
      ? true
      : false;
    let decoder = document
      .querySelector("#decoder .option__selection")
      .classList.contains("option__selection_selected")
      ? true
      : false;
    let ftpCred = document
      .querySelector("#ftp .option__selection")
      .classList.contains("option__selection_selected")
      ? true
      : false;
    let getMerchant = document
      .querySelector("#get-merchant .option__selection")
      .classList.contains("option__selection_selected")
      ? true
      : false;
    let itp = document
      .querySelector("#itp-merchant .option__selection")
      .classList.contains("option__selection_selected")
      ? true
      : false;
    let testMerchant = document
      .querySelector("#test-merchant .option__selection")
      .classList.contains("option__selection_selected")
      ? true
      : false;
    let getAffiliate = document
      .querySelector("#get-affiliate .option__selection")
      .classList.contains("option__selection_selected")
      ? true
      : false;
    let testAffiliate = document
      .querySelector("#test-affiliate .option__selection")
      .classList.contains("option__selection_selected")
      ? true
      : false;

    chrome.storage.sync.set(
      {
        extension: activateExtension,
        datafeed: activateDatafeed,
        sasUI: sasUI,
        transactionsScript: transactionsScript,
        decoder: decoder,
        ftpCred: ftpCred,
        getMerchant: getMerchant,
        testMerchant: testMerchant,
        itp: itp,
        getAffiliate: getAffiliate,
        testAffiliate: testAffiliate,
      },
      () => {
        // Update status to let user know options were saved.
        const status = document.querySelector(".action__status");
        status.textContent = "Options saved!";
        setTimeout(() => {
          status.textContent = "";
        }, 750);
        setTimeout(() => {
          chrome.runtime.reload();
        }, 1500);
      }
    );
  };

  // Saves options to chrome.storage
  const resetOptions = () => {
    chrome.storage.sync.set(
      {
        extension: true,
        datafeed: true,
        sasUI: true,
        transactionsScript: true,
        decoder: true,
        ftpCred: true,
        getMerchant: true,
        testMerchant: true,
        itp: true,
        getAffiliate: true,
        testAffiliate: true,
      },
      () => {
        // Update status to let user know options were saved.
        const status = document.querySelector(".action__status");
        status.textContent = "Options Reseted!";
        setTimeout(() => {
          status.textContent = "";
        }, 750);
        setTimeout(() => {
          chrome.runtime.reload();
        }, 1500);
      }
    );
  };
  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  const restoreOptions = () => {
    chrome.storage.sync.get(
      {
        extension: true,
        datafeed: true,
        sasUI: true,
        transactionsScript: true,
        decoder: true,
        ftpCred: true,
        getMerchant: true,
        testMerchant: true,
        itp: true,
        getAffiliate: true,
        testAffiliate: true,
      },
      (items) => {
        items.extension
          ? document
              .querySelector("#extension-option .option__selection")
              .classList.add("option__selection_selected")
          : "";
        items.datafeed
          ? document
              .querySelector("#datafeed .option__selection")
              .classList.add("option__selection_selected")
          : "";
        items.sasUI
          ? document
              .querySelector("#sas-ui .option__selection")
              .classList.add("option__selection_selected")
          : "";
        items.transactionsScript
          ? document
              .querySelector("#transactions-script .option__selection")
              .classList.add("option__selection_selected")
          : "";
        items.decoder
          ? document
              .querySelector("#decoder .option__selection")
              .classList.add("option__selection_selected")
          : "";
        items.ftpCred
          ? document
              .querySelector("#ftp .option__selection")
              .classList.add("option__selection_selected")
          : "";
        items.getMerchant
          ? document
              .querySelector("#get-merchant .option__selection")
              .classList.add("option__selection_selected")
          : "";
        items.itp
          ? document
              .querySelector("#itp-merchant .option__selection")
              .classList.add("option__selection_selected")
          : "";
        items.testMerchant
          ? document
              .querySelector("#test-merchant .option__selection")
              .classList.add("option__selection_selected")
          : "";
        items.getAffiliate
          ? document
              .querySelector("#get-affiliate .option__selection")
              .classList.add("option__selection_selected")
          : "";
        items.testAffiliate
          ? document
              .querySelector("#test-affiliate .option__selection")
              .classList.add("option__selection_selected")
          : "";
        if (
          !document
            .querySelector("#extension-option .option__selection")
            .classList.contains("option__selection_selected")
        ) {
          document
            .querySelector("#general-options")
            .classList.add("options-section_disable");
          document
            .querySelector("#merchant-options")
            .classList.add("options-section_disable");
          document
            .querySelector("#affiliate-options")
            .classList.add("options-section_disable");
        }
      }
    );
  };

  let options = document.querySelectorAll(".option__selection");
  options.forEach((op) => {
    op.addEventListener("click", (evt) => {
      op.classList.toggle("option__selection_selected");

      // Handle general options
      if (
        op.parentNode.id == "extension-option" &&
        op.classList.contains("option__selection_selected")
      ) {
        document
          .querySelector("#general-options")
          .classList.remove("options-section_disable");
        document
          .querySelector("#merchant-options")
          .classList.remove("options-section_disable");
        document
          .querySelector("#affiliate-options")
          .classList.remove("options-section_disable");
      } else if (op.parentNode.id == "extension-option") {
        document
          .querySelector("#general-options")
          .classList.add("options-section_disable");
        document
          .querySelector("#merchant-options")
          .classList.add("options-section_disable");
        document
          .querySelector("#affiliate-options")
          .classList.add("options-section_disable");
      }
    });
  });

  restoreOptions();
  document
    .querySelector("#save .action__button")
    .addEventListener("click", saveOptions);
  restoreOptions();
  document
    .querySelector("#reset .action__button")
    .addEventListener("click", resetOptions);
});
