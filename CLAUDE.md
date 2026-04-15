# カクテルマスター - カクテルアドバイザー学習アプリ

## プロジェクト概要
HBA（日本ホテルバーメンズ協会）認定カクテルアドバイザー資格の試験対策用Webアプリケーション。
楽しく・わかりやすく・視覚的に美しい学習体験を提供する。

## 技術スタック
- **フレームワーク**: React 19 + TypeScript + Vite 8
- **スタイリング**: Tailwind CSS v4 + Framer Motion
- **アイコン**: lucide-react
- **ルーティング**: react-router-dom v7
- **データ**: ローカルTS/JSONデータ（バックエンド不要）

## ディレクトリ構造
```
├── CLAUDE.md              # このファイル（プロジェクト指示書）
├── README.md              # プロジェクト説明
├── .claude/               # Claude Code設定
│   ├── settings.json      # プロジェクト設定
│   └── skills/            # カスタムスキル
│       └── find-skills/   # スキル検索スキル
├── .agent.md              # エージェントチーム構成
├── docs/                  # ドキュメント・学習資料
│   └── カクテルアドバイザー学習ガイド.md
├── src/
│   ├── components/        # 共通UIコンポーネント
│   ├── data/              # カクテル・クイズ等の学習データ
│   ├── hooks/             # カスタムフック
│   ├── pages/             # ページコンポーネント
│   ├── types/             # TypeScript型定義
│   └── utils/             # ユーティリティ関数
└── public/                # 静的アセット
```

## 開発コマンド
```bash
npm run dev       # 開発サーバー起動 (localhost:5173)
npm run build     # プロダクションビルド
npm run preview   # ビルドプレビュー
npm run lint      # ESLint実行
```

## 開発規約
- 関数コンポーネント + TypeScript（strict mode）
- 日本語UI、コミットメッセージは日本語OK
- モバイルファースト + レスポンシブデザイン
- Tailwind CSS v4 のユーティリティクラスを使用
- framer-motion でアニメーションを実装
- データは `src/data/` に TypeScript ファイルで管理
- 学習資料・リファレンスは `docs/` に配置

## デザイン方針
- ダークテーマ（バーの雰囲気）+ ネオンアクセントカラー
- ガラスモーフィズム効果のカードUI
- グラデーションテキスト
- 泡が立ち上るバックグラウンドアニメーション
