import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { ArticleListConfig } from "../models/article-list-config.model";
import { Article } from "../models/article.model";
import { Profile } from "../../profile/models/profile.model";

@Injectable({ providedIn: "root" })
export class ArticlesService {
  constructor(private readonly http: HttpClient) {}

  query(
    config: ArticleListConfig,
  ): Observable<{ articles: Article[]; articlesCount: number }> {
    const mockArticles: Article[] = [
      {
        slug: "mock-article-1",
        title: "Mock Article 1",
        description: "This is a mock description for article 1.",
        body: "This is the body of the mock article 1.",
        tagList: ["mock", "article"],
        createdAt: "2024-12-20T12:00:00Z",
        updatedAt: "2024-12-20T12:00:00Z",
        favorited: false,
        favoritesCount: 5,
        author: {
          username: "john_doe",
          bio: "Mock bio",
          image: "https://randomuser.me/api/portraits/men/44.jpg",
          following: false,
        },
      },
      {
        slug: "mock-article-2",
        title: "Mock Article 2",
        description: "This is a mock description for article 2.",
        body: "This is the body of the mock article 2.",
        tagList: ["mock", "article"],
        createdAt: "2024-12-19T12:00:00Z",
        updatedAt: "2024-12-19T12:00:00Z",
        favorited: true,
        favoritesCount: 10,
        author: {
          username: "jane_doe",
          bio: "Another mock bio",
          image: "https://randomuser.me/api/portraits/women/44.jpg",
          following: true,
        },
      },
    ];

    return of({ articles: mockArticles, articlesCount: mockArticles.length });
  }

  get(slug: string): Observable<Article> {
    return this.http
      .get<{ article: Article }>(`/articles/${slug}`)
      .pipe(map((data) => data.article));
  }

  delete(slug: string): Observable<void> {
    return this.http.delete<void>(`/articles/${slug}`);
  }

  create(article: Partial<Article>): Observable<Article> {
    return this.http
      .post<{ article: Article }>("/articles/", { article: article })
      .pipe(map((data) => data.article));
  }

  update(article: Partial<Article>): Observable<Article> {
    return this.http
      .put<{ article: Article }>(`/articles/${article.slug}`, {
        article: article,
      })
      .pipe(map((data) => data.article));
  }

  favorite(slug: string): Observable<Article> {
    return this.http
      .post<{ article: Article }>(`/articles/${slug}/favorite`, {})
      .pipe(map((data) => data.article));
  }

  unfavorite(slug: string): Observable<void> {
    return this.http.delete<void>(`/articles/${slug}/favorite`);
  }
}
