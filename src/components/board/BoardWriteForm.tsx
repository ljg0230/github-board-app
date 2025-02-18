import React, { useState, useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import useUnsavedChangesWarning from '@/hooks/useUnsavedChangesWarning';

interface BoardWriteFormProps {
  boardName: string;
  onSubmit: (title: string, content: string) => Promise<void>;
  initialTitle?: string;
  initialContent?: string;
}

const BoardWriteForm: React.FC<BoardWriteFormProps> = ({
  boardName,
  onSubmit,
  initialTitle = '',
  initialContent = ''
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [touched, setTouched] = useState({
    title: false,
    content: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const hasUnsavedChanges =
    (title.trim() !== '' || content.trim() !== '') && !isSubmitting;

  useUnsavedChangesWarning(hasUnsavedChanges);

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      title: true,
      content: true
    });

    if (!title.trim() || !content.trim()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit(title, content);
    } catch (error) {
      console.error('글쓰기 실패:', error);
      setIsSubmitting(false);
    }
  };

  const isFieldInvalid = (field: string, value: string) => {
    return touched[field as keyof typeof touched] && !value.trim();
  };

  return (
    <div>
      <h2 className="mb-4">{boardName}</h2>
      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-3">
          <Form.Control
            ref={titleInputRef}
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, title: true }))}
            isInvalid={isFieldInvalid('title', title)}
            style={{
              borderColor: isFieldInvalid('title', title)
                ? '#dc3545'
                : undefined
            }}
            required
          />
          {isFieldInvalid('title', title) && (
            <Form.Text className="text-danger">제목을 입력해주세요.</Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={15}
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, content: true }))}
            isInvalid={isFieldInvalid('content', content)}
            style={{
              borderColor: isFieldInvalid('content', content)
                ? '#dc3545'
                : undefined
            }}
            required
          />
          {isFieldInvalid('content', content) && (
            <Form.Text className="text-danger">내용을 입력해주세요.</Form.Text>
          )}
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button variant="primary" type="submit">
            등록하기
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default BoardWriteForm;
