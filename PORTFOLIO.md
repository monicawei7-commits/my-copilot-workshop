# 待辦清單 Web App

這是在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App。作品以純前端技術實作，提供日常待辦事項的新增、整理與完成管理，並保留使用者的資料與顯示偏好。

## 線上展示

https://<你的帳號>.github.io/<你的repo名稱>/

## 功能

- 新增待辦事項，空白內容不會被加入清單。
- 勾選或取消勾選待辦事項，完成項目會顯示刪除線並淡化文字。
- 刪除單筆待辦事項。
- 顯示所有待辦事項中的未完成數量。
- 使用「全部」、「未完成」與「已完成」篩選清單。
- 篩選結果為空時顯示對應提示，讓使用者知道項目是否只是被篩選條件排除。
- 支援淺色與深色模式切換。
- 未手動選擇主題時，會跟隨作業系統的深淺色設定。
- 記住使用者的主題偏好，重新整理後仍會保留。
- 一次清除所有已完成項目，清除前會顯示確認對話框。
- 沒有已完成項目時隱藏「清除已完成」按鈕。
- 使用 `localStorage` 保存待辦資料與主題偏好。
- 版面採卡片式設計，支援手機螢幕。

## 技術

- 使用 HTML、CSS 與原生 JavaScript。
- 不使用任何框架或第三方套件。
- 不引用外部 CDN，可離線開啟與使用。
- 使用 CSS 變數集中管理介面配色。
- 使用 `localStorage` 保存待辦清單與主題設定。

## 開發方式

- 使用 GitHub Copilot Agent Mode 協助探索需求、修改檔案、執行驗證與整理開發流程。
- 使用 MCP 連接 Microsoft Learn，查詢 `prefers-color-scheme` 與網頁無障礙色彩對比的官方建議。
- 使用 GitHub MCP Server 讀取 Issue、建立 Pull Request，並將修正連結回對應 Issue。
- 使用 `.github/prompts/fix-issue.prompt.md` 定義依 Issue 編號處理問題的 agentic workflow，包含讀取 Issue、等待確認、建立分支、修改、驗證、提交、推送與建立 PR。
- 透過 Git 分支與 Pull Request 管理功能修正，並在瀏覽器中驗證實際操作結果。

## 我學到什麼

- 如何用原生 JavaScript 管理待辦資料、事件與畫面重新渲染。
- 如何使用 `localStorage` 保存資料，讓頁面重新整理後仍能恢復狀態。
- 如何以 CSS 變數與 `prefers-color-scheme` 設計可切換的淺色與深色模式。
- 如何從使用者情境檢查篩選、確認對話框與色彩對比等無障礙與使用體驗細節。
- 如何使用 Agent Mode、MCP 與 Prompt 建立可重複的 Issue 修正與 Pull Request 工作流程。
