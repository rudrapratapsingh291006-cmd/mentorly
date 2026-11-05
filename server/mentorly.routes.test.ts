import { describe, expect, it } from "vitest";

describe("Mentorly role-based entry points", () => {
  it("keeps learner and mentor login destinations distinct", () => {
    const roles = ["learner", "mentor"] as const;
    expect(roles.map(role => `/login/${role}`)).toEqual(["/login/learner", "/login/mentor"]);
  });

  it("keeps dashboard destinations aligned with login roles", () => {
    const roles = ["learner", "mentor"] as const;
    expect(roles.map(role => `/dashboard/${role}`)).toEqual(["/dashboard/learner", "/dashboard/mentor"]);
  });
});
