🧹 Refactor mouse handling logic to use MathUtils.clamp

🎯 **What:** The code health issue addressed
The `handleHeadRotation` function in `src/components/Character/utils/mouseUtils.ts` contained a deeply nested if-else block used to compute the Y-axis value of the mouse cursor, capping it between `minRotationX` and `maxRotationX`. This has been refactored to simply use `THREE.MathUtils.clamp` to simplify the condition checking and duplicate `lerp` computations.

💡 **Why:** How this improves maintainability
Using a built-in math utility like `clamp` instead of deeply nested if-else branches significantly reduces cognitive load when reading this logic. It simplifies calculating constraints and guarantees the resulting code handles bounding conditions safely without code duplication (the previous implementation required copying the `lerp` statement 3 times).

✅ **Verification:** How you confirmed the change is safe
- Executed isolated unit testing against the original math logic to verify boundaries
- Ran `npm run lint` and `npx tsc -p tsconfig.app.json --noEmit` which both exited without issues
- Verified the final computation remains mathematically equivalent to the original nested logic

✨ **Result:** The improvement achieved
A cleaner, much easier to read calculation function for handling head rotation constraint logic with no changes to external functionality.
