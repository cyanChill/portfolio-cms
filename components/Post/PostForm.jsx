import {  useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

import styles from "../../styles/PostForm.module.css";
import FancyInput from "../FormElements/FancyInput";
import FormButton from "../FormElements/FormButton";

const PostForm = ({ onSubmit, onDelete, postData }) => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    await onSubmit(title, slug, excerpt, thumbnailUrl, editorRef.current.getContent(), isPublished);
    setIsSubmitting(false);
  }

  useEffect(() => {
    setIsSubmitting(false);
    if (postData) {
      setTitle(postData.title ?? "");
      setSlug(postData.slug ?? "")
      setExcerpt(postData.excerpt ?? "");
      setThumbnailUrl(postData.thumbnailUrl ?? "")
      setIsPublished(postData.isPublished ?? false);
    }
  }, [postData]);

  return (
    <form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
      <FancyInput
        type="text"
        labelText="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <FancyInput
        type="text"
        labelText="Post Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        required
      />
      <FancyInput
        type="text"
        labelText="Excerpt"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
      />
      <FancyInput
        type="url"
        labelText="Thumbnail Url"
        value={thumbnailUrl}
        onChange={(e) => setThumbnailUrl(e.target.value)}
        required
      />

      <div className={styles.editorContainer}>
        <Editor
          id="tinymce-script"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={!postData ? "" : postData.content ?? ""}
          tinymceScriptSrc="/tinymce/tinymce.min.js"
          init={{
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount', 'codesample'
            ],
            codesample_languages: [
              {text: 'HTML/XML', value: 'markup'},
              {text: 'HTML', value: 'html'},
              {text: 'JavaScript', value: 'javascript'},
              {text: 'CSS', value: 'css'},
              {text: 'JSX', value: 'jsx'},
              {text: 'TypeScript', value: 'typescript'},
            ],
            codesample_global_prismjs: true,
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | codesample | help',
          }}
        />
      </div>

      <label>
        Public Post{" "}
        <input
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
        />
      </label>

      <div className={styles.formActions}>
        {
          postData &&
          <FormButton
            altBdr
            type="button"
            style={{
              "--btn-theme": "hsl(var(--black-700))",
              "--btn-alt-theme": "hsl(var(--red-200))",
            }}
            onClick={onDelete}
          >
            <span>Delete Post</span>
          </FormButton>
        }

        <FormButton type="submit">
          <span>Save Post</span>
        </FormButton>
      </div>
    </form>
  );
};

export default PostForm;
