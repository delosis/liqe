import { parse } from "../../src/parse";
import { test as liqeTest } from "../../src/test";
import test from "ava";

test("returns true if subject matches the query", (t) => {
  t.true(
    liqeTest(parse("david"), {
      height: 180,
      name: "david",
    })
  );
});

test("returns false if subject does not match the query", (t) => {
  t.false(
    liqeTest(parse("mike"), {
      height: 180,
      name: "david",
    })
  );
});

// Case sensitivity tests
test("matches case-insensitive by default", (t) => {
  t.true(
    liqeTest(parse("DAVID"), {
      name: "david",
    })
  );
});

test("respects case sensitivity when enabled", (t) => {
  t.false(
    liqeTest(
      parse("DAVID"),
      {
        name: "david",
      },
      { caseSensitive: true }
    )
  );
});

test("matches exact case when case sensitive", (t) => {
  t.true(
    liqeTest(
      parse("David"),
      {
        name: "David",
      },
      { caseSensitive: true }
    )
  );
});

// Accent sensitivity tests
test("matches accent-sensitive by default", (t) => {
  t.false(
    liqeTest(parse("Jose"), {
      name: "José",
    })
  );
});

test("matches accent-insensitive when enabled", (t) => {
  t.true(
    liqeTest(
      parse("Jose"),
      {
        name: "José",
      },
      { accentSensitive: false }
    )
  );
});

test("matches accents both ways when accent-insensitive", (t) => {
  t.true(
    liqeTest(
      parse("José"),
      {
        name: "Jose",
      },
      { accentSensitive: false }
    )
  );
});

// Combined case and accent sensitivity tests
test("handles both case and accent sensitivity options", (t) => {
  t.true(
    liqeTest(
      parse("jose"),
      {
        name: "JOSÉ",
      },
      { caseSensitive: false, accentSensitive: false }
    )
  );
});

test("respects both case and accent sensitivity when enabled", (t) => {
  t.false(
    liqeTest(
      parse("jose"),
      {
        name: "JOSÉ",
      },
      { caseSensitive: true, accentSensitive: true }
    )
  );
});

test("matches exact case and accents when both sensitive", (t) => {
  t.true(
    liqeTest(
      parse("José"),
      {
        name: "José",
      },
      { caseSensitive: true, accentSensitive: true }
    )
  );
});
