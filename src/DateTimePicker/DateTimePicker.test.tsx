import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import DateTimePicker, { DateTimePickerProps } from "./DateTimePicker";

const PLACEHOLDER = "YYYY-MM-DD";

const VALID_DATE = "1999-12-31";
const INVALID_DATE = "99999";

describe("DateTimePicker", () => {
  function Setup(overrides: DateTimePickerProps) {
    return <DateTimePicker {...overrides} />;
  }

  describe("when initializing", () => {
    describe("when passed a (date) prop", () => {
      it("sets input value", () => {
        render(<Setup date={VALID_DATE} />);

        expect(screen.getByDisplayValue(VALID_DATE)).toBeInTheDocument();
      });
    });
  });

  describe("interactions", () => {
    describe("when typing in date", () => {
      describe("with a valid value", () => {
        it("keeps value", async () => {
          render(<Setup />);

          const input = screen.getByPlaceholderText(PLACEHOLDER);
          userEvent.type(input, `${VALID_DATE}{enter}`);

          await waitFor(() => {
            expect(input).toHaveValue(VALID_DATE);
          });
        });
      });

      describe("with an invalid value", () => {
        it("clears value", async () => {
          render(<Setup />);

          const input = screen.getByPlaceholderText(PLACEHOLDER);
          userEvent.type(input, `${INVALID_DATE}{enter}`);

          await waitFor(() => {
            expect(input).toHaveValue("");
          });
        });
      });
    });

    describe("when isWithinModal is true", () => {
      it("renders the datepicker popper in a portal", async () => {
        render(<Setup date={VALID_DATE} isWithinModal />);

        const input = screen.getByDisplayValue(VALID_DATE);
        await userEvent.click(input);

        expect(
          document.body.querySelector(".react-datepicker-popper")
        ).toBeInTheDocument();
      });
    });

    describe("clearable prop", () => {
      describe("when clearable is false (default)", () => {
        it("does not render clear button", () => {
          render(<Setup date={VALID_DATE} />);

          expect(
            screen.queryByRole("button", { name: /close/i })
          ).not.toBeInTheDocument();
        });
      });

      describe("when clearable is true", () => {
        it("renders clear button when date is selected", () => {
          render(<Setup clearable date={VALID_DATE} />);

          expect(
            screen.getByRole("button", { name: /close/i })
          ).toBeInTheDocument();
        });

        it("clears the date when clear button is clicked", async () => {
          render(<Setup clearable date={VALID_DATE} />);

          const clearButton = screen.getByRole("button", { name: /close/i });
          await userEvent.click(clearButton);

          await waitFor(() => {
            expect(screen.getByPlaceholderText(PLACEHOLDER)).toHaveValue("");
          });
        });
      });
    });
  });
});
